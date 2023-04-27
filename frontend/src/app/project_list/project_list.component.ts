import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-project_list',
  templateUrl: './project_list.component.html',
  styleUrls: ['./project_list.component.scss']
})
export class ProjectListComponent implements OnInit{
  
  records: any = [];
  clients: any = [];
  filteredRecords: any = [];
  searchTerm: string = '';

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.http.get<any[]>('http://localhost:8080/project/records')
    .subscribe(records => {
      this.records = records;
      this.filteredRecords = records;
    });
    this.http.get<any[]>('http://localhost:8080/client/records')
      .subscribe(clients => this.clients = clients);
  }

  filterRecords() {
    this.filteredRecords = this.records.filter((record:any) => {
      return record.name.toLowerCase().includes(this.searchTerm.toLowerCase());
    });
  }

  clearRecords() {
    this.searchTerm = '';
    this.ngOnInit()
  }

  getClientName(clientId: string): string {
    const client = this.clients.find((c: { _id: string, name: string }) => c._id === clientId);
    return client ? client.name : '';
  }  

  deleteProject(id: string) {
    if (confirm(`Are you sure you want to delete this project with id: ${id}?`)) {
      this.http.delete(`http://localhost:8080/project/delete/${id}`).subscribe(() => {
        this.records = this.records.filter((record:any) => record._id !== id);
        this.filterRecords();
      });
    }
  }

  editProject(id: string) {
    console.log(id)
    this.router.navigate([`/project_edit`, id/*/${id}`, id*/]);
  }

}
