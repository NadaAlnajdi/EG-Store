import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-show-user',
  templateUrl: './show-user.component.html',
  styleUrls: ['./show-user.component.css'],
})
export class ShowUserComponent implements OnInit {
  users: any = [];
  constructor(private global: GlobalService) {
    this.global.allUsers().subscribe((res) => {
      this.users = res.data;
    });
  }

  ngOnInit(): void {
    console.log(this.users);
  }

  handleDeleteUser(id: any, ind: any) {
    this.global.deleteUser(id).subscribe((res) => {
      console.log(res);
      this.users.splice(ind, 1);
    });
  }
}
