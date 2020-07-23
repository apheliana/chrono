import { Component } from '@angular/core';
import { ListService } from './services/list.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  // TODO A very tiny & innocent hack 😬
  // So the service can load the lists the beginning of the application
  // We may move it to the appInitializer later on
  constructor(private listService: ListService) {
    this.listService.getLists().subscribe();
  }
}
