import { Component } from '@angular/core';
import { CheckProgressFormService } from '../check-progress-form.service';
import { ProgressService } from '../progress.service';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-progress_add',
  templateUrl: './progress_add.component.html',
  styleUrls: ['./progress_add.component.scss']
})
export class ProgressAddComponent {

  /*name: String = '';
  description: String = '';
  doers: any = [];
  type: String = '';
  experience: Number | String = ''*/

  doers: any = [];
  doer: String = '';
  projects: any = [];
  type: String = '';
  start: String | Date  = '';
  finish: String | Date = ''; 
  

  constructor(private checkForm: CheckProgressFormService,  
    private router: Router,
    private projectserv: ProgressService,
    private http: HttpClient) {}
  

  ngOnInit() {
    this.getDoer()
    this.getProject()
    //console.log(this.clients)
  }

  /*getClient()  {
    this.http.get<any[]>('http://localhost:8080/client/records')
      .subscribe(clients => this.clients = clients);
  }*/

  getDoer()  {
    this.http.get<any[]>('http://localhost:8080/project_doer/records')
      .subscribe(doers => {
         this.doers = doers;
         console.log(this.doers); 
      });
  }

  getProject()  {
    this.http.get<any[]>('http://localhost:8080/project/records')
      .subscribe(projects => {
         this.projects = projects;
         console.log(this.projects); 
      });
  }

  createProgress(): any {
    const progress = {
      doer: this.doer,
      type: this.type,
      start: this.start,
      finish: this.finish
    }

    if(!this.checkForm.checkDoer(progress.doer)) {
      alert("The field of project doer must be specified!")
      return false;
    } else if(!this.checkForm.checkProject(progress.type)) {
      alert("The field of project of description must be specified!")
      return false;
    } else if(!this.checkForm.checkStart(progress.start)) {
      alert("The field of start date must be specified!")
      return false;
    }else if(!this.checkForm.checkFinish(progress.start)) {
      alert("The field of experience must be specified!")
      return false;
    }
    
    this.projectserv.addProgress(progress)
    this.router.navigate(['/progress_list']);
  }

}
