import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  OnInit,
  ChangeDetectionStrategy,
} from "@angular/core";

@Component({
  selector: "document-icon",
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
      d="M9 12h6m-6 4h6m2 5H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5.586a1 1 0 0 1 .707.293l5.414 5.414a1 1 0 0 1 .293.707V19a2 2 0 0 1-2 2z"
    ></path>
  </svg>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocumentIconComponent implements OnInit, OnChanges {
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
