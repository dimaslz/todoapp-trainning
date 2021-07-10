import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  OnInit,
  ChangeDetectionStrategy,
} from "@angular/core";

@Component({
  selector: "check-icon",
  template: `<svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    [style]="style"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="m5 13 4 4L19 7"
    ></path>
  </svg>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckIconComponent implements OnInit, OnChanges {
  @Input() style = "";
  @Input() size = 24;
  @Input() stroke: number | string = 2;
  @Input() color = "";

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    const colorHasChanged =
      changes.color?.previousValue !== changes.color?.currentValue;
    const sizeHasChanged =
      changes.size?.previousValue !== changes.size?.currentValue;
    const strokeHasChanged =
      changes.stroke?.previousValue !== changes.stroke?.currentValue;

    if (colorHasChanged || sizeHasChanged || strokeHasChanged) {
      this.style = "";
      this.renderStyle();
    }
  }

  ngOnInit(): void {
    this.renderStyle();
  }

  renderStyle(): void {
    const style = [];
    if (this.size) {
      style.push(`width: ${this.size}px; height: ${this.size}px;`);
    }
    if (this.color) {
      style.push(`color: ${this.color};`);
    }

    this.style = style.join(" ") + this.style;
  }
}
