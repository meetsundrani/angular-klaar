import { Component, OnInit, ViewChild, ChangeDetectorRef, OnChanges, Input, EventEmitter, ElementRef } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
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

export class TableComponent implements OnInit, OnChanges{
  @ViewChild(MatPaginator, { static: false })paginator!: MatPaginator;
  @ViewChild('#myTab', { static: true }) public grid = new ElementRef('#myTab');
  selected: string;
  public searchText = '';
  public caseSensitive = false;
  public exactMatch = false;
  displayedColumns: string[] = ['ifsc', 'bank_id', 'branch', 'address', 'city', 'district', 'state', 'bank_name'];
  dataSource: any;
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
    this.selected = this.cities[0].value;
  }

  ngOnInit() {
      this.getData();
  }

  getData(){
    this.getBankDetails(this.selected);
  }

  ngOnChanges(){
    this.getBankDetails(this.selected);
  }

  onSelectionChanged(ci:string, event: any) {
    if (event.isUserInput) { 
      this.getBankDetails(ci);
    }
  }

  displayFn(ci: string){
    return ci;
  }
  private getBankDetails(city: string) {
    this.bankService.getBankData(city).subscribe((response) => {
      this.data = response as BankDetails[];
      console.log(this.data);
      this.dataSource = new MatTableDataSource(this.data);
      this.dataSource.paginator = this.paginator;
      // this.cdr.detectChanges();
    })
  }
}

