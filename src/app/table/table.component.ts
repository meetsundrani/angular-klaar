import { AfterViewInit, Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { BankService } from '../bank.service';
export interface BankDetails {
  ifsc: string;
  bank_id: number;
  branch: string;
  address: string;
  city: string;
  district: string;
  state: string;
  bank_name: string;
}

interface City {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})

export class TableComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator, { static: false })paginator!: MatPaginator;
  displayedColumns: string[] = ['ifsc', 'bank_id', 'branch', 'address', 'city', 'district', 'state', 'bank_name'];
  dataSource: any;
  city = "MUMBAI";
  data: BankDetails[] = [];
  displayLoader = true;
  cities: City[] = [
    { value: 'MUMBAI', viewValue: 'Mumbai' },
    { value: 'VADODARA', viewValue: 'Vadodara' },
    { value: 'PUNE', viewValue: 'Pune' },
    { value: 'KALYAN', viewValue: 'Kalyan' },
    { value: 'THANE', viewValue: 'Thane' },
    { value: 'PANVEL', viewValue: 'Panvel' }
  ];

  constructor(private cdr: ChangeDetectorRef, private bankService: BankService) {
  }
  ngOnInit() {
    this.getData();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  getData() {
    this.getBankDetails(this.city);
  }

  onSelectChange(ci: string) {
    this.city = ci;
    this.getData();
  }


  private getBankDetails(city: string) {
    this.bankService.getBankData(city).subscribe((response) => {
      this.data = response as BankDetails[];
      console.log(this.data);
      this.dataSource = new MatTableDataSource(this.data);
      this.cdr.detectChanges();
    })
  }
}

