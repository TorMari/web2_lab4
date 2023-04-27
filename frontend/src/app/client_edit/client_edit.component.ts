import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from '../client.service';
import { CheckClientFormService } from '../check-client-form.service';
import { tap } from 'rxjs'

@Component({
  selector: 'app-client_edit',
  templateUrl: './client_edit.component.html',
  styleUrls: ['./client_edit.component.scss']
})
export class ClientEditComponent implements OnInit {

  client: any = {};
  name: String = '';
  budget: Number | String = ''

  constructor(private route: ActivatedRoute, private router: Router, private clientService: ClientService, private checkForm: CheckClientFormService) { }

  ngOnInit() {
    /*const clientId = this.route.snapshot.params['id'];
    this.clientService.getClient(clientId).subscribe((data: any) => {
      this.client = data;
      this.name = data.name;
      this.budget = data.budget
    });*/
    const clientId = this.route.snapshot.params['id'];
    this.clientService.getClient(clientId).pipe(
    tap((data: any) => {
      this.client = data;
      this.name = data.name;
      this.budget = data.budget;
    })
  ).subscribe();
  }

  editClient(): void {
    const clientId = this.route.snapshot.params['id'];
    const updatedClient = {
      name: this.name,
      budget: this.budget
    };
    this.clientService.updateClient(clientId, updatedClient).subscribe(() => {
      this.router.navigate(['/client_list']);
    }); 
  }
  

  /*editClient(): void {
    console.log(this.client._id)
    console.log(this.client)
    this.clientService.updateClient(this.client._id, this.client)
      .subscribe(() => this.router.navigate(['/client_list']));
  }*/

}
