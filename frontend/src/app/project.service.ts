import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http: HttpClient) { }

  addProject(project: Object) {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post('http://localhost:8080/project/add', project, { headers }).subscribe(
      res => {
        console.log(res); 
      },
      err => {
        console.log(err);
        alert('Project with this name can`t be create'); 
      }
    );
  }

  getProject(id: string): Observable<any> {
    return this.http.get(`http://localhost:8080/project/find/${id}`);
  }

  updateProject(id: string, doerData: any): Observable<any> {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.put(`http://localhost:8080/project/edit/${id}`, doerData, {headers});
  }
}
