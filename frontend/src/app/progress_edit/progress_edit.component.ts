import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProgressService } from '../progress.service';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs'

@Component({
  selector: 'app-progress_edit',
  templateUrl: './progress_edit.component.html',
  styleUrls: ['./progress_edit.component.scss']
})
export class ProgressEditComponent {

  
  progress: any = {}

  doers: any = [];
  doer: String = '';
  projects: any = [];
  type: String = '';
  start: String | Date  = '';
  finish: String | Date = ''; 

  constructor(private route: ActivatedRoute, 
    private router: Router, 
    private prService: ProgressService,
    private http: HttpClient) { }

  ngOnInit() {
    const prId = this.route.snapshot.params['id'];
    this.prService.getProgress(prId).pipe(
    tap((data: any) => {
      this.progress = data;
      this.doer = data.doer;
      this.type = data.type;
      this.start = data.start;
      this.finish = data.finish;
      this.projects = this.getProject()
      this.doers = this.getDoer()
    })
  ).subscribe();
  }

  getProject()  {
    this.http.get<any[]>('http://localhost:8080/project/records')
      .subscribe(projects => {
         this.projects = projects;
         console.log(this.projects); 
      });
  }

  getDoer()  {
    this.http.get<any[]>('http://localhost:8080/project_doer/records')
      .subscribe(doers => {
         this.doers = doers;
         console.log(this.doers); 
      });
  }

  editProgress(): void {
    const prId = this.route.snapshot.params['id'];
    const updatedProgress = {
      doer : this.doer,
      type : this.type,
      start : this.start,
      finish : this.finish
    };
    this.prService.updateProgress(prId, updatedProgress).subscribe(() => {
      this.router.navigate(['/progress_list']);
    }); 
    
  }

}
