import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DoerService {

  constructor(private http: HttpClient) { }

  addDoer(doer: Object) {
    //console.log('oj')
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post('http://localhost:8080/project_doer/add', doer, { headers }).subscribe(
      res => {
        console.log(res); 
      },
      err => {
        console.log(err);
        alert('Project doer with this name can`t be create'); 
      }
    );
  }

  /*editClient(id: string, client: any) {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.put(`http://localhost:8080/client/edit/${id}`, client, { headers });
  }*/
  getDoer(id: string): Observable<any> {
    return this.http.get(`http://localhost:8080/project_doer/find/${id}`);
  }

  /*updateClient(id: string, data: any): Observable<any> {
    return this.http.put(`http://localhost:8080/client/${id}`, data);
  }*/

  updateDoer(id: string, doerData: any): Observable<any> {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.put(`http://localhost:8080/project_doer/edit/${id}`, doerData, {headers});
  }
  
}
