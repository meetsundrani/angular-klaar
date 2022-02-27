import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class BankService {

  constructor(private _http: HttpClient) { }

  private handleError(err:HttpErrorResponse){
    console.log('Handle http error');
    console.log(err.message);
    return throwError(err.message);
  }

  getBankData(city: string): Observable<any> {
    const url = 'https://vast-shore-74260.herokuapp.com/banks';
    let params1 = new HttpParams().set('city',city);
    return this._http.get(url,{ params: params1 });
  }

  public getUserInfoFromLocalStorage = function (type: string) {
    return JSON.parse(localStorage.getItem(type) || '{}');
  }
  
  public setUserInfoInLocalStorage = (data:any)=>{
    localStorage.setItem('favourite',JSON.stringify(data))
   }
}


