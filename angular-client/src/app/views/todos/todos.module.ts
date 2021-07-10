import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { NgCrossUIModule } from '@cross-ui/angular';

import { ApiService } from '@/app/services/api/api.service';

import { TodosRoutingModule } from './todos.routing.module';
import { TodosComponent } from './todos.component';
import { TodosEffects } from './todos.effects';

import { reducer } from './todos.reducer';
import { IconsModule } from '@/app/components/icons/icons.module';

@NgModule({
  declarations: [TodosComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NgCrossUIModule,

    StoreModule.forFeature("todos", reducer),

    EffectsModule.forFeature([
      TodosEffects,
    ]),

    TodosRoutingModule,

    IconsModule,
  ],
  providers: [
    ApiService
  ]
})
export class TodosModule { }
