import { Component, importProvidersFrom } from '@angular/core';
import { CheckProjectFormService } from '../check-project-form.service';
import { ProjectService } from '../project.service';
import { ClientService } from '../client.service';
import { Router } from '@angular/router';
import { ClientListComponent } from '../client_list/client_list.component'
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs'

@Component({
  selector: 'app-project_add',
  templateUrl: './project_add.component.html',
  styleUrls: ['./project_add.component.scss']
})
export class ProjectAddComponent {
  
  name: String = '';
  description: String = '';
  clients: any = [];
  type: String = '';
  experience: Number | String = ''
  

  constructor(private checkForm: CheckProjectFormService,  
    private router: Router,
    private projectserv: ProjectService,
    private http: HttpClient) {}
  

  ngOnInit() {
    this.getClient()
    //console.log(this.clients)
  }

  /*getClient()  {
    this.http.get<any[]>('http://localhost:8080/client/records')
      .subscribe(clients => this.clients = clients);
  }*/

  getClient()  {
    this.http.get<any[]>('http://localhost:8080/client/records')
      .subscribe(clients => {
         this.clients = clients;
         console.log(this.clients); 
      });
  }


  createProject(): any {
    const project = {
      name: this.name,
      description: this.description,
      type: this.type,
      experience: this.experience,
    }

    console.log(this.clients);
    if(!this.checkForm.checkName(project.name)) {
      alert("The field of name must be specified!")
      return false;
    } else if(!this.checkForm.checkDescription(project.description)) {
      alert("The field of number of description must be specified!")
      return false;
    } else if(!this.checkForm.checkClient(project.type)) {
      alert("The field of experience must be specified!")
      return false;
    }else if(!this.checkForm.checkExperience(project.experience)) {
      alert("The field of experience must be specified!")
      return false;
    }
    console.log(project)
    this.projectserv.addProject(project)
    this.router.navigate(['/project_list']);
  }
}


/*import { Component } from '@angular/core';
import { CheckProjectFormService } from '../check-project-form.service';
import { ProjectService } from '../project.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs'

@Component({
  selector: 'app-project_add',
  templateUrl: './project_add.component.html',
  styleUrls: ['./project_add.component.scss']
})
export class ProjectAddComponent {
  
  name: string = '';
  description: string = '';
  clients: any[] = [];
  experience: number | string = '';
  selectedClientId: number | string = '';
  
  constructor(private checkForm: CheckProjectFormService,  
    private router: Router,
    private projectserv: ProjectService,
    private http: HttpClient) {}

  ngOnInit() {
    this.http.get<any[]>('http://localhost:8080/client/records')
      .subscribe(clients => this.clients = clients);
  }

  createProject(): any {
    const project = {
      name: this.name,
      description: this.description,
      clientId: this.selectedClientId,
      experience: this.experience
    }
    
    if(!this.checkForm.checkName(project.name)) {
      alert("The field of name must be specified!")
      return false;
    } else if(!this.checkForm.checkDescription(project.description)) {
      alert("The field of number of description must be specified!")
      return false;
    } else if(!this.checkForm.checkClient(project.clientId)) {
      alert("The field of experience must be specified!")
      return false;
    }else if(!this.checkForm.checkExperience(project.experience)) {
      alert("The field of experience must be specified!")
      return false;
    }
    console.log(project)
    this.projectserv.addProject(project)
    this.router.navigate(['/project_list']);
  }
}*/




/*import { Component } from '@angular/core';
import { CheckProjectFormService } from '../check-project-form.service';
import { ProjectService } from '../project.service';
import { Router } from '@angular/router';
//import { Client } from '../client.model';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators'

@Component({
  selector: 'app-project_add',
  templateUrl: './project_add.component.html',
  styleUrls: ['./project_add.component.scss']
})
export class ProjectAddComponent {
  
  name: string = '';
  description: string = '';
  clients: any[] = [];
  selectedClient:any= {};
  experience: number | string = '';
  

  constructor(
    private checkForm: CheckProjectFormService,  
    private router: Router,
    private projectService: ProjectService,
    private http: HttpClient) {}
  

  async ngOnInit() {
    this.getClients();
  }

  async getClients() {
    this.http.get<any[]>('http://localhost:8080/client/records').toPromise();
  }

  createProject(): any {
    const project = {
      name: this.name,
      description: this.description,
      clientId: this.selectedClient.id,
      client: this.selectedClient,
      experience: this.experience
    }
    
    if(!this.checkForm.checkName(project.name)) {
      alert("The field of name must be specified!")
      return false;
    } else if(!this.checkForm.checkDescription(project.description)) {
      alert("The field of number of description must be specified!")
      return false;
    } else if(!this.checkForm.checkClient(project.clientId)) {
      alert("The field of experience must be specified!")
      return false;
    }else if(!this.checkForm.checkExperience(project.experience)) {
      alert("The field of experience must be specified!")
      return false;
    }
    
    console.log(project)
    this.projectService.addProject(project)
    this.router.navigate(['/project_list']);
  }
}
*/

