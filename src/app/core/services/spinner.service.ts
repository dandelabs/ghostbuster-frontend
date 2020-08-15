import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import {
  Router,
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError,
} from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class SpinnerService {
  visibility: BehaviorSubject<boolean>;

  constructor(private router: Router) {
    
    this.router.events.subscribe(
      (event) => {
        if (event instanceof NavigationStart) {
          this.visibility.next(true);
        } else if (
          event instanceof NavigationEnd ||
          event instanceof NavigationCancel ||
          event instanceof NavigationError
        ) {
          this.visibility.next(false);
        }
      },
      () => {
        this.visibility.next(false);
      }
    );

    this.visibility = new BehaviorSubject(false);
  }

  show() {
    this.visibility.next(true);
  }

  hide() {
    this.visibility.next(false);
  }
}
