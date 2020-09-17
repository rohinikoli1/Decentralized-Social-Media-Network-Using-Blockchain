import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup} from '@angular/forms';
import { Router } from '@angular/router';
import { Webe3AuthService } from 'src/app/service/webe3-auth.service';
import { ContainerService } from 'src/app/service/container.service';
import { UserinfoService } from 'src/app/service/userinfo.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public login : FormGroup;
  private r ; string;
  bf: any;
  private val1:string;
  private val2:string;
  public val3:string;
  constructor(private router:Router,private auth:Webe3AuthService, private cont:ContainerService,private uInfo:UserinfoService,) { }

  ngOnInit() {
    this.login= new FormGroup({
    uName : new FormControl(),
    pass : new FormControl(),
    });
    
  }

  async validate(){
    this.r;
    await this.auth.authenticate(this.login.value.uName, this.login.value.pass).then(value => {
      this.r = value;
    });

    if(this.r != '0x0000000000000000000000000000000000000000'){
      //this.cont.adduser();
      
    await this.uInfo.getinfo(this.login.value.uName).then(value => {
        this.bf = value;
        this.val1 = this.bf[1];
        this.val2 = this.bf[0];
        this.val3 = this.bf[2];
        console.log(this.val3);
        //console.log(this.bf[0]);
        //console.log("we are before of value print");
        //console.log(value[0]);
        //console.log(value[1]);
    });
    this.cont.setUName(this.login.value.uName);
    console.log(this.val2);
    this.cont.setFriend(this.login.value.uName,this.val2);
    this.cont.setPass(this.login.value.pass);
    console.log(this.val3);
    this.cont.setId(this.val3);
   //console.log('rohini');
    //console.log(this.bf.toString());
      this.router.navigate(['newsfeed']);

    }
    else{
      console.log('Error !');

  }
  }
  register(){
    this.router.navigate(['register']);
  }

  forget(){
    this.router.navigate(['forget']);
  }
}
