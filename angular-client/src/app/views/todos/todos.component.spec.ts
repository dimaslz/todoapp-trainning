import { IconsModule } from '@/app/components/icons/icons.module';
import { ApiService } from '@/app/services/api/api.service';
import { APP_BASE_HREF, CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Actions } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { Observable } from 'rxjs';
import { NgCrossUIModule } from '@cross-ui/angular';

import * as TodosActions from './todos.actions';
import { TodosComponent } from './todos.component';
import { TodosEffects } from './todos.effects';
import { TodosState } from './todos.reducer';

describe('TodosComponent', () => {
  let component: TodosComponent;
  let fixture: ComponentFixture<TodosComponent>;
  let actions$: Observable<any>;
  let store: MockStore<TodosState>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      declarations: [TodosComponent],
      providers: [
        provideMockStore({
          initialState: {
            todos: {
              items: [{}],
              status: {
                loading: false,
                loaded: false,
                error: [],
              }
            }
          }
        }),
        provideMockActions(() => actions$),
        TodosEffects,
        {
          provide: ApiService,
          useValue: {
            todos: {
              getAll: jest.fn(),
              deleteByID: jest.fn()
            }
          }
        },
        { provide: APP_BASE_HREF, useValue: '/' }
      ],
      imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        // RouterModule.forRoot([]),
        // RouterTestingModule.withRoutes([]),
        IconsModule,
        NgCrossUIModule,
        // { provide: APP_BASE_HREF, useValue: '/' }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodosComponent);
    component = fixture.componentInstance;
    actions$ = TestBed.inject(Actions);
    store = TestBed.inject(MockStore);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  test("On init should have items", async() => {
    fixture.detectChanges();
    expect(component.todos.length).toBe(1);
  });

  describe("Should call action", () => {
    beforeEach(() => {
      jest.spyOn(store, 'dispatch');
    });

    test("onInit should call to getTodos()", async() => {
      const action = TodosActions.getTodos();
      fixture.detectChanges();

      expect(store.dispatch).toHaveBeenCalledWith(action);
    });

    test("on execute getTodos() method should call to getTodos() action", async() => {
      const action = TodosActions.getTodos();
      component.getTodos();

      expect(store.dispatch).toHaveBeenCalledWith(action);
    });

    test("on execute deleteTodo(todoId) method should call to deleteTodo({todoId}) action", async() => {
      const action = TodosActions.deleteTodo({ todoId: "todo_id" });
      component.deleteTodo("todo_id");

      expect(store.dispatch).toHaveBeenCalledWith(action);
    });

    test("on execute createTodo(todo) method should call to createTodo({todo}) action", async() => {
      const action = TodosActions.createTodo({ todo: {} });
      component.createTodo({});

      expect(store.dispatch).toHaveBeenCalledWith(action);
    });

    test("on execute onSubmit() method should call to createTodo({todo}) action", async() => {
      const titleValue = "foo";
      component.form.controls.title.setValue(titleValue);
      const action = TodosActions.createTodo({ todo: { title: titleValue } });
      component.onSubmit();

      expect(store.dispatch).toHaveBeenCalledWith(action);
    });
  });
});
