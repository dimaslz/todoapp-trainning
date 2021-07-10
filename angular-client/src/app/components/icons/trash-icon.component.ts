import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  OnInit,
  ChangeDetectionStrategy,
} from "@angular/core";

@Component({
  selector: "trash-icon",
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
      d="m19 7-.867 12.142A2 2 0 0 1 16.138 21H7.862a2 2 0 0 1-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v3M4 7h16"
    ></path>
  </svg>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrashIconComponent implements OnInit, OnChanges {
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
