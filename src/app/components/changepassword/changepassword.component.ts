import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Webe3AuthService } from 'src/app/service/webe3-auth.service';
import { Router } from '@angular/router';
import { ContainerService } from 'src/app/service/container.service';


@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css']
})
export class ChangepasswordComponent implements OnInit {
  public changepass : FormGroup;

  constructor(
    private auth:Webe3AuthService, 
    private router:Router,
    private cont:ContainerService) { }

  ngOnInit() {
    this.changepass = new FormGroup({
      newpass : new FormControl(),
      confirmpass : new FormControl()
    });
  }

  async validate(){
    await this.auth.changepass(
      this.cont.getId(),
      this.cont.getUName(),
      this.changepass.value.newpass
    );
    this.router.navigate(['login']);
  }

}
