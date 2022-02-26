import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BankDetails } from './table/table.component';
@Injectable({
  providedIn: 'root'
})
export class BankService {

  constructor(private bankService: HttpClient) { }

  getBankData(city: string): Observable<object> {
    const url = 'https://vast-shore-74260.herokuapp.com/banks';
    let params1 = new HttpParams().set('city',city);
    return this.bankService.get(url,{ params: params1 });
  }
}
