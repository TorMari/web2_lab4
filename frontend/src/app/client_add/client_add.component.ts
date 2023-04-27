import { Component, OnInit } from '@angular/core';
import { CheckClientFormService } from '../check-client-form.service';
import { ClientService } from '../client.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-client_add',
  templateUrl: './client_add.component.html',
  styleUrls: ['./client_add.component.scss']
})


export class ClientAddComponent implements OnInit {
    
  name: String = '';
  budget: Number | String = ''
  

  constructor(private checkForm: CheckClientFormService,  
    private router: Router,
    private clientserv: ClientService) {}
  

  ngOnInit(): void {
    
  }

  createClient(): any {
    const client = {
      name: this.name,
      budget: this.budget
    }
    
    if(!this.checkForm.checkName(client.name)) {
      alert("The field of name must be specified!")
      return false;
    } else if(!this.checkForm.checkBudget(client.budget)) {
      alert("The field of budget must be specified!")
      return false;
    }

    this.clientserv.addClient(client)
    this.router.navigate(['/client_list']);
  }
}
