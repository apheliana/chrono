import { Component } from '@angular/core';
import { ChronoUser } from '../../components/user/chrono-user';
import { ListService } from '../../services/list.service';

@Component({
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})
export class UsersPage {
  get users(): ChronoUser[] {
    return this.listService.users;
  }

  constructor(private listService: ListService) {}
}
