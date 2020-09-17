import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/navbar/login/login.component';
import { RegisterComponent } from './components/navbar/register/register.component';
import { NewsfeedComponent } from './components/newsfeed/newsfeed.component';
import { ForgetpassComponent } from './components/navbar/forgetpass/forgetpass.component';
import { ChatComponent } from './components/maincontent/chat/chat.component';
import { ProfileComponent } from './components/maincontent/profile/profile.component';
import { FriendlistComponent } from './components/friendlist/friendlist.component';
import { ChangepasswordComponent } from './components/changepassword/changepassword.component';
import { DeleteaccountComponent } from './components/deleteaccount/deleteaccount.component';

const routes: Routes = [
  
  {path:'login',component:LoginComponent},
  {path:'changepassword',component:ChangepasswordComponent},
  {path:'register',component:RegisterComponent},
  {path:'forget',component:ForgetpassComponent},
  {path:'newsfeed',component:NewsfeedComponent,
    children:[
      {path:'friendlist',component:FriendlistComponent},
      {path:'profile/chat',component:ChatComponent},
      {path:'profile',component:ProfileComponent},
      {path:'friendlist/profile',component:ProfileComponent},
      {path:'changepassword',component:ChangepasswordComponent},
      {path:'newsfeed/changepassword',component:ChangepasswordComponent},
      {path:'forget/changepassword',component:ChangepasswordComponent},
      {path:'deleteaccount',component:DeleteaccountComponent},
      {path:'newsfeed/deleteaccount',component:DeleteaccountComponent},
      {path:'deleteaccount/profile',component:ProfileComponent },
      {path:'profile/friendlist',component:FriendlistComponent},
    ]}  
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{
    onSameUrlNavigation:'ignore'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents=[LoginComponent,
                                RegisterComponent,
                              NewsfeedComponent,
                              ForgetpassComponent,
                              ChatComponent,
                              ProfileComponent,
                              ChangepasswordComponent,
                              DeleteaccountComponent]