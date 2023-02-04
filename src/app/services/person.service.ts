import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { Person } from '../model/person';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  personUrl: string = 'http://localhost:8080/api/v1/person';

  constructor(
    private http: HttpClient
  ) { }

  getPeople(): Observable<Person[]> {
    return this.http.get<Person[]>(`${this.personUrl}/findAll`)
    .pipe(
      catchError(this.handleError<Person[]>('getPeople', []))
    );
  }

  getPerson(id: number): Observable<Person> {
    return this.http.get<Person>(`${this.personUrl}/find/${id}`)
        .pipe(
          catchError(this.handleError<Person>('getPerson'))
        );
  }

  save(person: Person): Observable<any> {
    return this.http.post(`${this.personUrl}/save`, person)
      .pipe(
        catchError(this.handleError<Person>('save'))
      );
  }

  update(person: Person): Observable<any> {
    return this.http.put(`${this.personUrl}/update`, person)
      .pipe(
        catchError(this.handleError<Person>('update'))
      );
  }

  delete(idPerson: number): Observable<any> {
    return this.http.delete(`${this.personUrl}/delete/${idPerson}`)
      .pipe(
        catchError(this.handleError<Person>('delete'))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error);

      return of(result as T);
    };
  }
}
