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

  @Effect()
  createPizza$ = this.actions$.pipe(
    ofType(fromPizzas.CREATE_PIZZA),
    map((action: fromPizzas.CreatePizza) => action.payload),
    // tslint:disable-next-line: rxjs-no-unsafe-switchmap
    switchMap(pizza => {
      return this.pizzaService.createPizza(pizza).pipe(
        // tslint:disable-next-line: no-shadowed-variable
        map(pizza => new fromPizzas.CreatePizzaSuccess(pizza)),
        catchError(error => of(new fromPizzas.CreatePizzaFail(error)))
      );
    })
  );

  @Effect()
  updatePizza$ = this.actions$.pipe(
    ofType(fromPizzas.UPDATE_PIZZA),
    map((action: fromPizzas.UpdatePizza) => action.payload),
    // tslint:disable-next-line: rxjs-no-unsafe-switchmap
    switchMap(pizza => {
      return this.pizzaService.updatePizza(pizza).pipe(
        map(savedPizza => new fromPizzas.UpdatePizzaSuccess(savedPizza)),
        catchError(error => of(new fromPizzas.UpdatePizzaFail(error)))
      );
    })
  );

  @Effect()
  removePizza$ = this.actions$.pipe(
    ofType(fromPizzas.REMOVE_PIZZA),
    map((action: fromPizzas.RemovePizza) => action.payload),
    // tslint:disable-next-line: rxjs-no-unsafe-switchmap
    switchMap(pizza => {
      return this.pizzaService.removePizza(pizza).pipe(
        map(() => new fromPizzas.RemovePizzaSuccess(pizza)),
        catchError(error => of(new fromPizzas.RemovePizzaFail(error)))
      );
    })
  );
}
