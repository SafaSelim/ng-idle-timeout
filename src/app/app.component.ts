import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { IdleTimeoutService } from './services/idle-timeout.service';
import { LoginService } from './services/login.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ng-idle-timeout';

  userSubscription: Subscription = new Subscription;

  constructor(
    @Inject(PLATFORM_ID) platformId: any,
    private idleTimeoutService: IdleTimeoutService,
    private loginService: LoginService,
  ) {
    if (isPlatformBrowser(platformId)) {
      this.userSubscription = this.loginService.isLoggedIn.subscribe(value => {
        if (value.isLoggedIn) {
          this.idleTimeoutService.initIdleTimeout(Number(value?.timeout));
        } else {
          this.idleTimeoutService.destroyIdleSubscriptions();
        }
      });
    }
  }
}
