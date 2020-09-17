import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { RightsideComponent } from './components/rightside/rightside.component';
import { NewsfeedComponent } from './components/newsfeed/newsfeed.component';
import { ProfileComponent } from './components/maincontent/profile/profile.component';
import { ChatComponent } from './components/maincontent/chat/chat.component';
import { LoginComponent } from './components/navbar/login/login.component';
import { RegisterComponent } from './components/navbar/register/register.component';
import { ForgetpassComponent } from './components/navbar/forgetpass/forgetpass.component';
import { FriendlistComponent } from './components/friendlist/friendlist.component';
import { DeleteaccountComponent } from './components/deleteaccount/deleteaccount.component';
import { ChangepasswordComponent } from './components/changepassword/changepassword.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidebarComponent,
    RightsideComponent,
    NewsfeedComponent,
    ProfileComponent,
    ChatComponent,
    LoginComponent,
    RegisterComponent,
    ForgetpassComponent,
    FriendlistComponent,
    DeleteaccountComponent,
    ChangepasswordComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
