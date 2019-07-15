import { Injectable } from '@angular/core';

import { Effect, Actions, ofType } from '@ngrx/effects';
import { switchMap, map, catchError } from 'rxjs/operators';

import * as fromPizzas from '../actions/pizzas.action';
import * as services from '../../services';
import { of } from 'rxjs';

@Injectable()
export class PizzasEffects {
  constructor(
    private actions$: Actions,
    private pizzaService: services.PizzasService
  ) {}

  @Effect()
  loadPizzas$ = this.actions$.pipe(
    ofType(fromPizzas.LOAD_PIZZAS),
    switchMap(() => {
      return this.pizzaService.getPizzas().pipe(
        map(pizzas => new fromPizzas.LoadPizzasSuccess(pizzas)),
        catchError(error => of(new fromPizzas.LoadPizzasFail(error)))
      );
    })
  );
}
