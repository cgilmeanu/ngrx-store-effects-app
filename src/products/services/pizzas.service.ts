import { throwError as observableThrowError, Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { catchError } from "rxjs/operators";

import { Pizza } from "../models/pizza.model";

@Injectable()
export class PizzasService {
  constructor(private http: HttpClient) {}

  getPizzas(): Observable<Pizza[]> {
    return this.http.get<Pizza[]>(`/api/pizzas`);
  }

  createPizza(payload: Pizza): Observable<Pizza> {
    return this.http.post<Pizza>(`/api/pizzas`, payload);
  }

  updatePizza(payload: Pizza): Observable<Pizza> {
    return this.http.put<Pizza>(`/api/pizzas/${payload.id}`, payload);
  }

  removePizza(payload: Pizza): Observable<Pizza> {
    return this.http.delete<any>(`/api/pizzas/${payload.id}`);
  }
}
