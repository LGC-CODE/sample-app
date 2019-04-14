import { Component } from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {Animation} from './classes/animation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    Animation.FadeEffect
  ]
})
export class AppComponent {
  title = 'cybercube-app';

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation;
  }
}
