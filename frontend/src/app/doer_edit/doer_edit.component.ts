import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DoerService } from '../doer.service';
import { CheckDoerFormService } from '../check-doer-form.service';
import { tap } from 'rxjs'

@Component({
  selector: 'app-doer_edit',
  templateUrl: './doer_edit.component.html',
  styleUrls: ['./doer_edit.component.scss']
})
export class DoerEditComponent implements OnInit {

  
  client: any = {};
  name: String = '';
  doer_num: Number | String = '';
  experience: Number | String = '';

  constructor(private route: ActivatedRoute, private router: Router, private doerService: DoerService, private checkForm: CheckDoerFormService) { }

  ngOnInit() {
    /*const clientId = this.route.snapshot.params['id'];
    this.clientService.getClient(clientId).subscribe((data: any) => {
      this.client = data;
      this.name = data.name;
      this.budget = data.budget
    });*/
    const doerId = this.route.snapshot.params['id'];
    this.doerService.getDoer(doerId).pipe(
    tap((data: any) => {
      this.client = data;
      this.name = data.name;
      this.doer_num = data.doer_num;
      this.experience = data.experience
    })
  ).subscribe();
  }

  editDoer(): void {
    const doerId = this.route.snapshot.params['id'];
    const updatedDoer = {
      name: this.name,
      doer_num: this.doer_num,
      experience: this.experience
    };
    this.doerService.updateDoer(doerId, updatedDoer).subscribe(() => {
      this.router.navigate(['/doer_list']);
    }); 
  }

}
