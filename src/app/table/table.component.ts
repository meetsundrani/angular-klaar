import { FunctionExpr } from '@angular/compiler';
import { Component, OnInit, ViewChild, ChangeDetectorRef, OnChanges} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSelectChange } from '@angular/material/select';
import { MatTableDataSource } from '@angular/material/table';
import { resultMemoize } from '@ngrx/store';
import { AnyFn } from '@ngrx/store/src/selector';
import { BankService } from '../bank.service';
import { BankDetails } from '../Model/bank-details.model';
import { BankFilter } from '../Model/bankFilter.model';
import { FilterPipe } from './filter.pipe';
interface City {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})

export class TableComponent implements OnInit {
  @ViewChild(MatPaginator, { static: false })paginator!: MatPaginator;
  selected: string;
  displayedColumns: string[] = ['favorite','ifsc', 'bank_id', 'branch', 'address', 'city', 'district', 'state', 'bank_name'];
  dataSource: any;
  dataSourceFilters: any;
  data: BankDetails[] = [];
  searchText = '';
  toggle = true;
  status = 'Enable'; 
  selectedUser : any;
  cities: City[] = [
    { value: 'MUMBAI', viewValue: 'Mumbai' },
    { value: 'VADODARA', viewValue: 'Vadodara' },
    { value: 'PUNE', viewValue: 'Pune' },
    { value: 'KALYAN', viewValue: 'Kalyan' },
    { value: 'THANE', viewValue: 'Thane' },
    { value: 'PANVEL', viewValue: 'Panvel' }
  ];

  citiess: string[]=['MUMBAI','VADODARA','PUNE','KALYAN','THANE','PANVEL'];
  states: string[]=['MAHARASHTRA','GUJARAT'];
  bkFilters: BankFilter[]=[];
  
  defaultValue = "All";

  filterDictionary= new Map<string,string>();


  constructor(private cdr: ChangeDetectorRef, private bankService: BankService, private filterr: FilterPipe) {
    this.selected = this.cities[0].value;
  }

  ngOnInit() {
      this.getData();
      this.bkFilters.push({bankname:'city',options:this.citiess,defaultValue:this.defaultValue});
      this.bkFilters.push({bankname:'state',options:this.states,defaultValue:this.defaultValue});


      this.dataSourceFilters.filterPredicate = function (record:any, filteer:any) {
        var map = new Map(JSON.parse(filteer));
        let isMatch = false;
        for (let [key, value] of map) {
          isMatch = value == 'All' || record[key as keyof BankDetails] == value;
          if (!isMatch) return false;
        }
        return isMatch;
      };
  }

  applyEmpFilter(ob: MatSelectChange, bankfilter: BankFilter) {
    this.filterDictionary.set(bankfilter.bankname, ob.value);
    var jsonString = JSON.stringify(
      Array.from(this.filterDictionary.entries())
    );
    this.dataSourceFilters.filter = jsonString;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getData(){
    this.getBankDetails(this.selected);
  }

  onSelectionChanged(ci:string, event: any) {
    if (event.isUserInput) { 
      this.getBankDetails(ci);
    }
  }

  activeSkill(element:any) {
    let user1 = [];
    this.selectedUser = element;
    console.log(element)
    this.bankService.setUserInfoInLocalStorage(element)
    console.log(this.bankService.getUserInfoFromLocalStorage("favourite"))
  }

  displayFn(ci: string){
    return ci;
  }
  private getBankDetails(city: string) {
    this.bankService.getBankData(city).subscribe((response) => {
      this.data = response as BankDetails[];
      this.dataSource = new MatTableDataSource(this.data);
      this.dataSource.paginator = this.paginator;
      this.dataSourceFilters = new MatTableDataSource(this.data);
      this.cdr.detectChanges();
    })
  }

  // memoize = function <T = any>(fn: Func<T>) {
  //   const cache = new Map();
  //   const cached = function (this: any, val: T): any {
  //     return cache.has(val)
  //       ? cache.get(val)
  //       : cache.set(val, fn.call(this, val)) && cache.get(val);
  //   };
  //   cached.cache = cache;
  //   return cached;
  // };
}

