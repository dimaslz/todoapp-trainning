import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { CreateTodo, Todo, UpdateTodo } from '@/interfaces';
import { environment } from '@/environments/environment';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public todos = {
    getAll: (): Observable<Todo[]> => (
      this.http.get<Todo[]>(`${this.host}/todos`).pipe(
        catchError(({ error }) => throwError(error.message))
      )
    ),
    getByID: (todoId: string): Observable<Todo> => (
      this.http.get<Todo>(`${this.host}/todos/${todoId}`).pipe(
        catchError(({ error }) => throwError(error.message))
      )
    ),
    create: (todo: CreateTodo): Observable<Todo> => (
      this.http.post<Todo>(`${this.host}/todos`, todo).pipe(
        catchError(({ error }) => throwError(error.message))
      )
    ),
    updateByID: (todoId: string, todo: UpdateTodo): Observable<Todo> => (
      this.http.put<Todo>(`${this.host}/todos/${todoId}`, todo).pipe(
        catchError(({ error }) => throwError(error.message))
      )
    ),
    deleteByID: (todoId: string): Observable<void> => (
      this.http.delete<void>(`${this.host}/todos/${todoId}`, {}).pipe(
        catchError(({ error }) => throwError(error.message))
      )
    ),
  };

  private host = "";


  constructor(
    private http: HttpClient,
  ) {
    this.setup({ host: environment.apiUrl });
  }


  public setup(config: any): void {
    this.host = config.host;
  }
}
