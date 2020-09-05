import { Component } from '@angular/core';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  styleUrls: ['./app.component.scss'],
  templateUrl: './app.component.html',
})
export class AppComponent {
  currentApplicationVersion = environment.appVersion; // (npm run build) to automatically increment version patch number by 1
}
