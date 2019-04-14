import { trigger, transition, style, query, animateChild, group, animate } from '@angular/animations';

export class Animation {
  static FadeEffect =
    trigger('routeAnimations', [
      transition('splash <=> carousel', [
        style({ opacity: 1 }),
        query(':leave', [style({opacity: 1, position: 'absolute'})]),
        query(':enter', [style({opacity: 0, position: 'absolute'})]),
        group([
          query(':leave', [animate('1300ms ease-out', style({ opacity: 0, position: 'absolute' }))]),
          query(':enter', [animate('1300ms ease-out', style({ opacity: 1, position: 'absolute' }))]),
        ])
      ])
    ]);
}
