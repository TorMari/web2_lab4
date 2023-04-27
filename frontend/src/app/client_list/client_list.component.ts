/*import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
//import * as $ from 'jquery';
//import 'datatables.net';


@Component({
  selector: 'app-client_list',
  templateUrl: './client_list.component.html',
  styleUrls: ['./client_list.component.scss']
})
export class ClientListComponent implements OnInit {
  
  records: any = [];
  //dataTable: any = [];

  constructor(private http: HttpClient, private router: Router) { }


  ngOnInit(): void {
    //console.log('hey');
    //$('#example').DataTable()
    this.http.get<any[]>('http://localhost:8080/client/records')
      .subscribe(records => {
        this.records = records
        //$('#example').DataTable().draw()
      });
    //$('#example').DataTable();
  }


  deleteClient(id: string) {
    if (confirm(`Are you sure you want to delete this client with id: ${id}?`)) {
      this.http.delete(`http://localhost:8080/client/delete/${id}`).subscribe(() => {
        this.records = this.records.filter((record:any) => record._id !== id);
      });
    }
  }

  editClient(id: string) {
    console.log(id)
    this.router.navigate([`/client_edit`, id]);
  }
  
  
}*/




import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-client_list',
  templateUrl: './client_list.component.html',
  styleUrls: ['./client_list.component.scss']
})
export class ClientListComponent implements OnInit {
  
  records: any = [];
  filteredRecords: any = [];
  searchTerm: string = '';

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.getOpen()
  }

  filterRecords() {
    this.filteredRecords = this.records.filter((record:any) => {
      return record.name.toLowerCase().includes(this.searchTerm.toLowerCase());
    });
  }

  clearRecords() {
    this.searchTerm = '';
    this.getOpen()
  }

  getOpen() : void {
    this.http.get<any[]>('http://localhost:8080/client/records')
      .subscribe(records => {
        this.records = records;
        this.filteredRecords = records;
      });
  }

  deleteClient(id: string) {
    if (confirm(`Are you sure you want to delete this client with id: ${id}?`)) {
      this.http.delete(`http://localhost:8080/client/delete/${id}`).subscribe(() => {
        this.records = this.records.filter((record:any) => record._id !== id);
        this.filterRecords();
      });
    }
  }

  editClient(id: string) {
    this.router.navigate([`/client_edit`, id]);
  }

}



/*import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import 'datatables.net';


@Component({
  selector: 'app-client_list',
  templateUrl: './client_list.component.html',
  styleUrls: ['./client_list.component.scss']
})
export class ClientListComponent implements OnInit, OnChanges {
  
  records: any = [];
  dataTable: any = [];

  constructor(private http: HttpClient, private router: Router) { }


  ngOnInit(): void {
    console.log('hey');
    this.http.get<any[]>('http://localhost:8080/client/records')
      .subscribe(records => {
        this.records = records;
        this.dataTable = $('#example').DataTable();
        this.dataTable.draw();
      });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['records']) {
      this.dataTable.clear();
      this.dataTable.rows.add(this.records);
      this.dataTable.draw();
    }
  }

  deleteClient(id: string) {
    if (confirm(`Are you sure you want to delete this client with id: ${id}?`)) {
      this.http.delete(`http://localhost:8080/client/delete/${id}`).subscribe(() => {
        this.records = this.records.filter((record:any) => record._id !== id);
      });
    }
  }

  editClient(id: string) {
    console.log(id)
    this.router.navigate([`/client_edit`, id]);
  }
}*/

