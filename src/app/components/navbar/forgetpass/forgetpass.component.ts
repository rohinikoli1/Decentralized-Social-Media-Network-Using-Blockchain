import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Webe3AuthService } from 'src/app/service/webe3-auth.service';
import { UserService } from 'src/app/service/user.service';
import { ContainerService } from 'src/app/service/container.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-forgetpass',
  templateUrl: './forgetpass.component.html',
  styleUrls: ['./forgetpass.component.css']
})
export class ForgetpassComponent implements OnInit {
  public forgetpass : FormGroup;
  private r : string;

  constructor(
    private router:Router, 
    private auth:Webe3AuthService, 
    private user:UserService,
    private cont:ContainerService
    ) { }

  ngOnInit() {
    this.forgetpass = new FormGroup({
      userName : new FormControl(),
      que : new FormControl(),
      ans : new FormControl()
    });
  }

  async validate(){
      await this.auth.forgetpass(this.forgetpass.value.userName,this.forgetpass.value.que,this.forgetpass.value.ans).then(value => {
        this.r= value;
      });
      if(this.r){
        console.log('Result -',this.r)
        console.log(this.forgetpass.value.userName);
        this.cont.setPass(this.r[0]);
        this.cont.setId(this.r[1]);
        this.cont.setUName(this.forgetpass.value.userName);
        this.router.navigate(['changepassword']);
      }
      else
      console.log('Invalid Credentials !');
  }
}
