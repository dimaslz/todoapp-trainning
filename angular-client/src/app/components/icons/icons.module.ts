import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CheckIconComponent } from './check-icon.component';
import { TrashIconComponent } from './trash-icon.component';
import { DocumentIconComponent } from './document-icon.component';

@NgModule({
  declarations: [
    CheckIconComponent,
    TrashIconComponent,
    DocumentIconComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    CheckIconComponent,
    TrashIconComponent,
    DocumentIconComponent,
  ],
})
export class IconsModule { }
