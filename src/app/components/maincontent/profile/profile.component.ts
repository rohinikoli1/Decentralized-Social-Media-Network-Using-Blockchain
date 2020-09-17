import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContainerService } from 'src/app/service/container.service';
import { UserinfoService } from 'src/app/service/userinfo.service';
import { async } from '@angular/core/testing';
import { UserFriendsService } from 'src/app/service/user-friends.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  bf: any;
  val1: any;
  val2: any;
  str:any;
  fname: string;
  id:string;
   public val3:string;
  constructor(private uFriend:UserFriendsService, private route:ActivatedRoute, private router:Router,private cont:ContainerService,private userInfo:UserinfoService) { }
   private name:string;
  ngOnInit() {
  this.fname = this.cont.getFriendname();
  this.name=this.cont.getUName();
  if(this.fname==this.name){
    this.getfname();
    this.str=true;
    console.log(" Error occoured"+ this.name);
  }
  else{
      console.log("we are in else part "+this.name+"we are at after name printing");
  }
  }

  async getfname(){
    await this.userInfo.getinfo(this.cont.getFriendname()).then(value => {
      this.bf=value;
      this.val1 = this.bf[1];
      this.val2 = this.bf[0];
      this.val3 = this.bf[2];
      console.log("value of val3= "+this.val3);
      this.name=this.val1;
      });
     console.log(this.name);
  }

  async clicked(){
    console.log('after click on request button and in senders requested');
    this.id=this.cont.getId();
    this.getfname();
    console.log("before addrefri"+this.id+" "+this.fname);
    await this.uFriend.addReqFri(this.id,this.fname);
    //console.log("After add request fri");
    this.name=this.cont.getUName();
    console.log("before addSendfri "+this.val3 +" "+ this.name);
    await this.uFriend.addSendFri(this.val3,this.name);
    
    //console.log('after click on request button and in request pending');
    //this.uFriend.addReqFri();
    //this.router.navigate(['friendlist'],{relativeTo:this.route});
  }
}
