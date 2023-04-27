import { Component } from '@angular/core';
import { CheckDoerFormService } from '../check-doer-form.service';
import { DoerService } from '../doer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-doer_add',
  templateUrl: './doer_add.component.html',
  styleUrls: ['./doer_add.component.scss']
})


export class DoerAddComponent {

  name: String = '';
  doer_num: Number | String = ''
  experience: Number | String = ''
  

  constructor(private checkForm: CheckDoerFormService,  
    private router: Router,
    private doerserv: DoerService) {}
  

  ngOnInit(): void {
    
  }

  createDoer(): any {
    const doer = {
      name: this.name,
      doer_num: this.doer_num,
      experience: this.experience
    }
    
    if(!this.checkForm.checkName(doer.name)) {
      alert("The field of name must be specified!")
      return false;
    } else if(!this.checkForm.checkDoer(doer.doer_num)) {
      alert("The field of number of doers must be specified!")
      return false;
    } else if(!this.checkForm.checkExperience(doer.experience)) {
      alert("The field of experience must be specified!")
      return false;
    }
    this.doerserv.addDoer(doer)
    this.router.navigate(['/doer_list']);
  }
}
