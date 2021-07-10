import {
  Component,
  OnInit,
} from "@angular/core";
import { NotificationService } from "./notification.service";

@Component({
  selector: "notifications-component",
  templateUrl: "notifications.component.html",
})
export class NotificationsComponent implements OnInit {
	public message = "";
	public color = "red";

	constructor(
		private notificationService: NotificationService,
	) {}

	ngOnInit(): void {
	  this.notificationService.notifications.subscribe(({ message, options = { color: "red" } }) => {
	    this.color = options.color;

	    this.message = message;
	    setTimeout(() => {
	      this.message = "";
	    }, 3000);
	  });
	}
}
