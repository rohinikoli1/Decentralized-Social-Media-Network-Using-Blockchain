import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-deleteaccount',
  templateUrl: './deleteaccount.component.html',
  styleUrls: ['./deleteaccount.component.css']
})
export class DeleteaccountComponent implements OnInit {

  constructor(private router:Router,private route:ActivatedRoute,) { }

  ngOnInit() {
  }

  yes():void{
        console.log("yes");
        this.router.navigate(['login'])
  }

  no():void{
    console.log("no");
    this.router.navigate(['profile'],{relativeTo:this.route})
  }

}
