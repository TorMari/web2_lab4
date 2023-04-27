import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-doer_list',
  templateUrl: './doer_list.component.html',
  styleUrls: ['./doer_list.component.scss']
})
export class DoerListComponent implements OnInit{
  
  /*records: any = [];
  filteredRecord: any = [];
  searchTerm: string = '';

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.http.get<any[]>('http://localhost:8080/project_doer/records')
    .subscribe(records => {
      this.records = records;
      this.filteredRecord = records;
    });
  }

  filterRecord() {
    this.filteredRecord = this.records.filter((record:any) => {
      console.log('hahah')
      return record.name.toLowerCase().includes(this.searchTerm.toLowerCase());
    });
  }

  clearRecord() {
    this.searchTerm = '';
    this.ngOnInit()
  }

  deleteDoer(id: string) {
    if (confirm(`Are you sure you want to delete this project doer with id: ${id}?`)) {
      this.http.delete(`http://localhost:8080/project_doer/delete/${id}`).subscribe(() => {
        this.records = this.records.filter((record:any) => record._id !== id);
      });
    }
  }

  editDoer(id: string) {
    console.log(id)
    this.router.navigate([`/doer_edit`, id]);
  }*/

  
  records: any = [];
  filteredRecords: any = [];
  searchTerm: string = '';

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.http.get<any[]>('http://localhost:8080/project_doer/records')
      .subscribe(records => {
        this.records = records;
        this.filteredRecords = records;
      });
  }

  filterRecords() {
    this.filteredRecords = this.records.filter((record:any) => {
      console.log(record.name.toLowerCase)
      return record.name.toLowerCase().includes(this.searchTerm.toLowerCase());
    });
  }

  clearRecords() {
    this.searchTerm = '';
    this.ngOnInit()
  }

  deleteDoer(id: string) {
    if (confirm(`Are you sure you want to delete this project doer with id: ${id}?`)) {
      this.http.delete(`http://localhost:8080/project_doer/delete/${id}`).subscribe(() => {
        this.records = this.records.filter((record:any) => record._id !== id);
        this.filterRecords();
      });
    }
  }

  editDoer(id: string) {
    this.router.navigate([`/doer_edit`, id]);
  }

}
