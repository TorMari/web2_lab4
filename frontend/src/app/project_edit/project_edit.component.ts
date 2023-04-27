import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from '../project.service';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs'

@Component({
  selector: 'app-project_edit',
  templateUrl: './project_edit.component.html',
  styleUrls: ['./project_edit.component.scss']
})
export class ProjectEditComponent {

  project: any = {}
  name: String = '';
  description: String = '';
  clients: any = [];
  type: String = '';
  experience: Number | String = ''

  constructor(private route: ActivatedRoute, 
    private router: Router, 
    private prService: ProjectService,
    private http: HttpClient) { }

  ngOnInit() {
    const prId = this.route.snapshot.params['id'];
    this.prService.getProject(prId).pipe(
    tap((data: any) => {
      this.project = data;
      this.name = data.name;
      this.description = data.description;
      this.experience = data.experience;
      this.type = data.type;
      this.experience = data.experience
      this.clients = this.getClient()
    })
  ).subscribe();
  }

  getClient()  {
    this.http.get<any[]>('http://localhost:8080/client/records')
      .subscribe(clients => {
         this.clients = clients;
         console.log(this.clients); 
      });
  }

  editProject(): void {
    const prId = this.route.snapshot.params['id'];
    const updatedProject = {
      name: this.name,
      description: this.description,
      type: this.type,
      experience: this.experience,
    };
    this.prService.updateProject(prId, updatedProject).subscribe(() => {
      this.router.navigate(['/project_list']);
    }); 
  }

}
