import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as firebase from 'firebase';


type User = string;
interface SelectUser {
  itemName:User;
  id: string;
}
interface Room {
  members: User[];
  name: string;
}

export const snapshotToArray = (snapshot: any) => {
  const returnArr = [];

  snapshot.forEach((childSnapshot: any) => {
    const item = childSnapshot.val();
    item.key = childSnapshot.key;
    returnArr.push(item);
  });

  return returnArr;
};

@Component({
  selector: 'app-addgroup',
  templateUrl: './addgroup.component.html',
  styleUrls: ['./addgroup.component.css']
})
export class AddgroupComponent implements OnInit {
  roomForm: FormGroup;
  nickname = '';
  groupName = '';
  groupList: Room[] = [];

   // ng dropdown
   dropdownList = [];
   dropdownSettings = {};
  //  allAvaibUsers:SelectUser[] = [];
   allUsers:SelectUser[] = [];
   selectedItems: SelectUser[] = [];
   // ng dropdown
 

  ref = firebase.database().ref('OnetoOne/');
 

  constructor(private router: Router,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              private snackBar: MatSnackBar) {
              }

  ngOnInit(): void {
    this.roomForm = this.formBuilder.group({
      'roomname' : [null, Validators.required]
    });
    this.nickname = localStorage.getItem('nickname');

    firebase.database().ref('users/').orderByChild('nickname').on('value', (resp2: any) => {
      const roomusers = snapshotToArray(resp2);

      const newVar:SelectUser[] = roomusers.map(ru => {
        return { "id": ru.key, "itemName": ru.nickname };
      });
      console.log(newVar);
      // this.allAvaibUsers = newVar;
      this.dropdownList = newVar;
    });
    this.fetchGroupList();

    this.dropdownSettings = {
      singleSelection: false,
      text: "Select Users to Add in Group",
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      enableSearchFilter: true,
      classes: "myclass custom-class"
    };

  }


  fetchGroupList() {
    firebase.database().ref('group/').on('value', (resp2: any) => {
      this.groupList = snapshotToArray(resp2).filter(el => el?.members?.includes(this.nickname)).filter(el=>el);
    });
  }

  createGroupRoom(){
    const group = {
      members: this.selectedItems.map(el=>el.itemName),
      name: this.groupName
    }
    console.log(group);
    
      
    const newRoom = firebase.database().ref('group/').push();
    // console.log( "rooomname : " + this.roomname , "NICK:"+ this.nickname , this.UserOne , "USER TWO"+ this.UserTwo);
    newRoom.set(group).then((response)=>{
      this.selectedItems = [];
      this.groupName = "";
      this.router.navigate(['/roomlist']);
    });  

  }

  gooBack(): void {
    this.router.navigate(['/roomlist']);
  }


}
