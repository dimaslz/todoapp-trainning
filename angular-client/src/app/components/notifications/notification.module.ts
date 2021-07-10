import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotificationService } from './notification.service';
import { NotificationsComponent } from './notification.component';

@NgModule({
  declarations: [
    NotificationsComponent,
  ],
  imports: [
    CommonModule,
  ],
  providers: [
    NotificationService,
  ],
  exports: [
    NotificationsComponent
  ]
})
export class NotificationsModule { }
