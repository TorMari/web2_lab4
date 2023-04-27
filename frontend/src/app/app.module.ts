import { Component, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { ClientListComponent } from './client_list/client_list.component';
import { ClientAddComponent } from './client_add/client_add.component';
import { ClientDeleteComponent } from './client_delete/client_delete.component';
import { ClientEditComponent } from './client_edit/client_edit.component';
import { FormsModule } from '@angular/forms';
import { CheckClientFormService } from './check-client-form.service';
import { ClientService } from './client.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { DoerListComponent } from './doer_list/doer_list.component';
import { DoerAddComponent } from './doer_add/doer_add.component';
import { DoerDeleteComponent } from './doer_delete/doer_delete.component';
import { DoerEditComponent } from './doer_edit/doer_edit.component';
import { DoerService } from './doer.service';
import { CheckDoerFormService } from './check-doer-form.service';
import { ProjectAddComponent } from './project_add/project_add.component';
import { ProjectListComponent } from './project_list/project_list.component';
import { ProjectDeleteComponent } from './project_delete/project_delete.component';
import { ProjectEditComponent } from './project_edit/project_edit.component';
import { CheckProjectFormService } from './check-project-form.service';
import { ProjectService } from './project.service';
import { CheckProgressFormService } from './check-progress-form.service';
import { ProgressAddComponent } from './progress_add/progress_add.component';
import { ProgressListComponent } from './progress_list/progress_list.component';
import { ProgressEditComponent } from './progress_edit/progress_edit.component';
import { ProgressService } from './progress.service';


const appRoute: Routes = [
  { path: '', component: HomeComponent },
  { path: 'client_list', component: ClientListComponent },
  { path: 'client_add', component: ClientAddComponent },
  { path: 'client_delete', component: ClientDeleteComponent },
  { path: 'client_edit/:id', component: ClientEditComponent },
  { path: 'doer_list', component: DoerListComponent },
  { path: 'doer_add', component: DoerAddComponent },
  { path: 'doer_delete', component: DoerDeleteComponent },
  { path: 'doer_edit/:id', component: DoerEditComponent },
  { path: 'project_list', component: ProjectListComponent },
  { path: 'project_add', component: ProjectAddComponent },
  { path: 'project_delete', component: ProjectDeleteComponent },
  { path: 'project_edit/:id', component: ProjectEditComponent },
  { path: 'progress_list', component: ProgressListComponent },
  { path: 'progress_add', component: ProgressAddComponent },
  //{ path: 'progress_delete', component: ProgressDeleteComponent },
  { path: 'progress_edit/:id', component: ProgressEditComponent },
]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ClientListComponent,
    ClientAddComponent,
    ClientDeleteComponent,
    ClientEditComponent,
    DoerListComponent,
    DoerAddComponent,
    DoerDeleteComponent,
    DoerEditComponent,
    ProjectAddComponent,
    ProjectListComponent,
    ProjectDeleteComponent,
    ProjectEditComponent,
    ProgressAddComponent,
    ProgressListComponent,
    ProgressEditComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoute),
    BrowserAnimationsModule,
  ],
  providers: [CheckClientFormService, ClientService,
    CheckDoerFormService, DoerService,
    CheckProjectFormService, ProjectService,
    CheckProgressFormService, ProgressService],
  bootstrap: [AppComponent]
})
export class AppModule { }
