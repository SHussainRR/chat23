import { OneChatroomComponent } from './one-chatroom/one-chatroom.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RoomlistComponent } from './roomlist/roomlist.component';
import { AddroomComponent } from './addroom/addroom.component';
import { ChatroomComponent } from './chatroom/chatroom.component';
import { AddoneComponent } from './addone/addone.component';
import { AddgroupComponent } from './addgroup/addgroup.component';
import { GrouproomComponent } from './grouproom/grouproom.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'roomlist', component: RoomlistComponent },
  { path: 'addroom', component: AddroomComponent },

  { path: 'addone', component: AddoneComponent},
  { path: 'addgroup', component: AddgroupComponent},
  { path: 'chatroomone/:roomname' , component: OneChatroomComponent},
  { path: 'chatroom/:roomname', component: ChatroomComponent },
  { path: 'grouproom/:roomname', component: GrouproomComponent },


  { path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
