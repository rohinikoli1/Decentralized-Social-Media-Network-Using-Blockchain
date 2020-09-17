import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { Web3Service } from 'src/app/service/web3.service';
import { Webe3AuthService } from 'src/app/service/webe3-auth.service';
import { strictEqual } from 'assert';
import { UserService } from 'src/app/service/user.service';
import { UserinfoService } from 'src/app/service/userinfo.service';
import { ContainerService } from 'src/app/service/container.service';
import { IpfsService } from 'src/app/service/ipfs.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public registration : FormGroup;
  x:string;
  ac:string;
  private uName : string

  constructor(private router:Router, 
    private auth:Webe3AuthService, 
    private user:UserService, 
    private uinfo:UserinfoService,
    private cont:ContainerService, 
    private ipfs:IpfsService) { }

  ngOnInit() {
    this.registration = new FormGroup({
      name : new FormControl(),
      userName : new FormControl(),
      pass : new FormControl(),
      cpass : new FormControl(),
      que : new FormControl(),
      ans : new FormControl(),
      photo : new FormControl()
    });
  }
  async setImg(files: File[]){
    console.log(this.registration.value.photo);
      await this.ipfs.setImg(files).then(value => {
        this.registration.value.photo = '0xCA35b7d915458EF540aDe6068dFe2F44E8fa733c';
      });
      }
// Add user in auth , users, info
  async validate(){
    console.log('inside validate');
    if(this.registration.value.pass == this.registration.value.cpass){
      console.log('password same');
      await this.user.getuser(this.registration.value.name).then(value => {
        this.uName = value;
      });
      if(!this.uName){
        //Create new Account
        await this.auth.create_user(this.registration.value.pass).then(value => {
          this.ac = value;
        });
        console.log('Befor Register');

        this.cont.setId(this.ac);
        this.cont.setPass(this.registration.value.pass);

        await this.auth.register(
          this.registration.value.userName,
          this.cont.getId(),
          this.registration.value.name,
          this.registration.value.pass,
          this.registration.value.que,
          this.registration.value.ans
        );
          console.log('After Register');
        await this.user.adduser(
          this.cont.getId(),
          this.registration.value.name,
          this.registration.value.userName
        );
        console.log('After adduser');
        
        await this.uinfo.newuser(
          this.registration.value.userName,
          this.cont.getId(),
          '0xCA35b7d915458EF540aDe6068dFe2F44E8fa733c',
          this.registration.value.name
        );
        console.log('After newuser');
        this.router.navigate(['login']);
      }
      else{
        console.log('\nUser Already Exists !\n');
        this.router.navigate(['login']);
      }
    }
    else{
      console.log('\nPasswords are not same !\n');
    }

  }

}

