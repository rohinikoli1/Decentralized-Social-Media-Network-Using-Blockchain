import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { FormControl, FormGroup} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UserinfoService } from 'src/app/service/userinfo.service';
import { ContainerService } from 'src/app/service/container.service';
import { async } from '@angular/core/testing';
import { UserFriendsService } from 'src/app/service/user-friends.service';
@Component({
  selector: 'app-friendlist',
  templateUrl: './friendlist.component.html',
  styleUrls: ['./friendlist.component.css']
})
export class FriendlistComponent implements OnInit {
  search_user: FormGroup;
  names_list:String[]=[];
  bf: any;
  private val1:string;
  private val2:string;
  private num:number;
  private id:string;
  //router: any;
  
  constructor(private ufriend:UserFriendsService, private user:UserService,private router:Router,private route:ActivatedRoute,private userInfo:UserinfoService,private cont:ContainerService) { 
    
  }

  ngOnInit() {
    this.search_user = new FormGroup({
      Search : new FormControl(),
      });
  }

  async getuser(){
        this.names_list=[];
        await this.user.getuser(this.search_user.value.Search).then(value => {
          this.names_list.push(value);
          console.log(this.search_user.value.Search+" we printing value here");
          console.log(this.names_list);
      });
  }
  async myMethod(user1){
      console.log("hallo");
      await this.user.getuser(user1).then(value => {
        this.val1=value;
        console.log(" rohit "+ this.val1);
      });
     
     await this.userInfo.getinfo(this.val1).then(value => {
        this.bf=value;
        this.val1 = this.bf[1];
        this.val2 = this.bf[0];
        });
        console.log(this.val1);
        console.log(this.val2);
      this.cont.setFriend(this.val1,this.val2);
      this.router.navigate(['profile'],{relativeTo:this.route})
  }
   async requested(){
     this.names_list=[];
     this.id =this.cont.getId();
     await this.ufriend.getLengthReqFri(this.cont.getId()).then(value=>{ 
      this.num=value;
      console.log(this.num);
     });
     for (let i = 0; i < this.num; i++){
         await this.ufriend.getReqFri(this.id,i).then(value=>{
            this.names_list.push(value);
            console.log(this.names_list);
          });
     }
     
  console.log("we are out of requested function");
  }

   async pending(){
    this.names_list=[];
     this.id=this.cont.getId();
     console.log(" id in pending "+this.id );
     await this.ufriend.getLengthSedFri(this.cont.getId()).then(value=>{ 
      this.num=value;
      console.log("length in pending "+this.num);
     });
     for (let i = 0; i < this.num; i++){
         await this.ufriend.getSedFri(this.id,i).then(value=>{
            
            this.names_list.push(value);
            console.log(this.names_list);
          });
     }
     console.log("we are out of pending function");
   }

}
