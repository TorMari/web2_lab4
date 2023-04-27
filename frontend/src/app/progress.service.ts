import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProgressService {

  constructor(private http: HttpClient) { }

  addProgress(progress: Object) {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post('http://localhost:8080/progress/add', progress, { headers }).subscribe(
      res => {
        console.log(res); 
      },
      err => {
        console.log(err)
        if(err.error.message === undefined) {
        alert('Project with this name is alreagey in progress') } else
        {alert(err.error.message)}
      }
    );
  }

  getProgress(id: string): Observable<any> {
    return this.http.get(`http://localhost:8080/progress/find/${id}`);
  }

  updateProgress(id: string, progData: any) {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.put(`http://localhost:8080/progress/edit/${id}`, progData, {headers})
  }
}
