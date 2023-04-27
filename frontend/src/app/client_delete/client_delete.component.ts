import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from '../client.service';

@Component({
  selector: 'app-client_delete',
  templateUrl: './client_delete.component.html',
  styleUrls: ['./client_delete.component.scss']
})

export class ClientDeleteComponent implements OnInit {
  client: any;

  constructor(private route: ActivatedRoute, private clientService: ClientService) { }

  ngOnInit() {
    
  }
}
