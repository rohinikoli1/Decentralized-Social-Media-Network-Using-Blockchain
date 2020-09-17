import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserinfoService } from 'src/app/service/userinfo.service';
import { ContainerService } from 'src/app/service/container.service';
import { IpfsService } from 'src/app/service/ipfs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  private photo:string;
  private name:string;
  bf: any;
  private url:string;


  constructor(private route:ActivatedRoute, private router:Router,private uInfo:UserinfoService,private cont:ContainerService, private ipfs:IpfsService) { }

  ngOnInit() {
    
    this.uInfo.getinfo(this.cont.getUName()).then(value => {
    this.bf=value;
    this.photo=this.bf[0];
    this.name=this.bf[1];
    
    });
    this.ipfs.getImg(this.photo).then(value=>{
      this.url=value;
    });
  }

  clicked(){
    this.router.navigate(['friendlist'],{relativeTo:this.route});
  }

  change_password(){
    this.router.navigate(['changepassword'],{relativeTo:this.route});
  }

  logout(){
    this.router.navigate(['login']);
  }

  delete_account(){
    this.router.navigate(['deleteaccount'],{relativeTo:this.route});
  }
}
