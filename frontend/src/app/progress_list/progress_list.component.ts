import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-progress_list',
  templateUrl: './progress_list.component.html',
  styleUrls: ['./progress_list.component.scss']
})
export class ProgressListComponent {

  records: any = [];
  projects: any = [];
  doers: any = [];
  filteredRecords: any = [];
  searchTerm: string = '';

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.http.get<any[]>('http://localhost:8080/progress/records')
    .subscribe(records => {
      this.records = records;
      this.filteredRecords = records;
    });
    this.http.get<any[]>('http://localhost:8080/project_doer/records')
      .subscribe(doers => this.doers = doers);
    this.http.get<any[]>('http://localhost:8080/project/records')
      .subscribe(projects => this.projects = projects);
  }

  filterRecords() {
    this.filteredRecords = this.records.filter((record:any) => {
      const dateParts = this.searchTerm.split('.');
      const dateObject = new Date(`${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`);
      return this.getDoerName(record.doer).toLowerCase().includes(this.searchTerm.toLowerCase())||
             this.getProjectName(record.type).toLowerCase().includes(this.searchTerm.toLowerCase()) ||
             ((new Date(record.start)).toLocaleDateString()).includes(dateObject.toLocaleDateString()) ||
             ((new Date(record.finish)).toLocaleDateString()).includes(dateObject.toLocaleDateString());
    });
  }

  clearRecords() {
    this.searchTerm = '';
    this.ngOnInit()
  }

  getDate(date: any) {
    const d = new Date(date).toLocaleDateString();
    return d;
  }

  getDoerName(doerId: string): string {
    const doer = this.doers.find((c: { _id: string, name: string }) => c._id === doerId);
    return doer ? doer.name : '';
  } 
  
  getProjectName(projectId: string): string {
    const project = this.projects.find((c: { _id: string, name: string }) => c._id === projectId);
    return project ? project.name : '';
  } 

  deleteProgress(id: string) {
    if (confirm(`Are you sure you want to delete this project in progress with id: ${id}?`)) {
      this.http.delete(`http://localhost:8080/progress/delete/${id}`).subscribe(() => {
        this.records = this.records.filter((record:any) => record._id !== id);
        this.filterRecords();
      });
    }
  }

  editProgress(id: string) {
    console.log(id)
    this.router.navigate([`/progress_edit`, id/*/${id}`, id*/]);
  }
}
