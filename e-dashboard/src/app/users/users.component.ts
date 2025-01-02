import {Component, OnInit} from '@angular/core';
import {RouterLink} from '@angular/router';
import {UsersService} from '../services/users.service';

@Component({
  selector: 'app-users',
  imports: [
    RouterLink
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit {
  constructor(private usersService: UsersService) {
  }

  users: any[] = [];

  getUsers(role: string = 'employee') {
    this.usersService.getAll(role).subscribe({
      next: res => {
        this.users = res.data;
      },
      error: error => {
      }
    })
  }

  changeActive(userId: string, active: boolean) {
    this.usersService.updateOne({active}, userId).subscribe({
      next: res => {
        alert('user updated');
        this.getUsers();
      },
      error: error => {
      }
    })
  }

  deleteUser(userId: string) {
    this.usersService.deleteOne(userId).subscribe({
      next: res => {
        alert('user deleted');
        this.users = this.users.filter(user => user._id !== userId);
      },
      error: error => {
      }
    })
  }

  filterUsers(role: string) {
    this.getUsers(role);
  }

  ngOnInit() {
    this.getUsers();
  }
}
