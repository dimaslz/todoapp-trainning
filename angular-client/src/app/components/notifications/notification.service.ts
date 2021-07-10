import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';

@Injectable({
  providedIn: 'root'
})
export class NotificationService implements OnInit, OnDestroy {
  public notifications: Subject<any> = new Subject();

  constructor(

  ) {

  }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {

  }

  sendNotification(message: string, options: any = {}): void {
    this.notifications.next({ message, options });
  }
}
