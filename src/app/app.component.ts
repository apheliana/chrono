import { Component } from '@angular/core';
import { environment } from '../environments/environment';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  styleUrls: ['./app.component.scss'],
  templateUrl: './app.component.html',
})
export class AppComponent {
  currentApplicationVersion = environment.appVersion; // (npm run build) to automatically increment version patch number by 1

  constructor(public authService: AuthService) {}
}
