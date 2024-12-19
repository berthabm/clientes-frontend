import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { URL_CLIENT_LINQ, URL_CLIENT_SP } from '../utils/app.constants';
import { Page } from '../model/page';


@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private readonly http: HttpClient) { }

  getClientsLinq(page: Page): Observable<any> {
    return this.http.get(`${URL_CLIENT_LINQ}?pageNumber=${page.PageNumber}&pageSize=${page.PageSize}`);
  }

  getClientsSP(page: Page): Observable<any> {
    return this.http.get(`${URL_CLIENT_SP}?pageNumber=${page.PageNumber}&pageSize=${page.PageSize}`);
  }
}
