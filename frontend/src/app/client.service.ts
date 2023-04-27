/*import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators'


@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http: HttpClient) { }

  addClient(client: Object) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json')
    return this.http.post(
      'http://localhost:8080/client/add',
      client,
      { headers: headers }).pipe(map(res => res))
  }
}*/

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http: HttpClient) { }

  addClient(client: Object) {
    //console.log('oj')
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post('http://localhost:8080/client/add', client, { headers }).subscribe(
      res => {
        console.log(res); 
      },
      err => {
        console.log(err);
        alert('Client with this name can`t be create');
        //console.error('Client with this name can`t be create');
      }
    );
  }

  /*editClient(id: string, client: any) {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.put(`http://localhost:8080/client/edit/${id}`, client, { headers });
  }*/
  getClient(id: string): Observable<any> {
    return this.http.get(`http://localhost:8080/client/find/${id}`);
  }

  /*updateClient(id: string, data: any): Observable<any> {
    return this.http.put(`http://localhost:8080/client/${id}`, data);
  }*/

  updateClient(id: string, clientData: any): Observable<any> {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.put(`http://localhost:8080/client/edit/${id}`, clientData, {headers});
  }
  
}

