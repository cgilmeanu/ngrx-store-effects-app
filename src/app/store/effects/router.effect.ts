import { Actions, Effect, ofType } from '@ngrx/effects';
import * as routerActions from '../actions/router.action';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { map, tap } from 'rxjs/operators';

@Injectable()
export class RouterEffects {
  constructor(
    private actions$: Actions,
    private router: Router,
    private location: Location
  ) {}

  @Effect({ dispatch: false })
  navigate$ = this.actions$.pipe(
    ofType(routerActions.GO),
    map((action: routerActions.Go) => action.payload),
    tap(({ path, query: queryParams, extras }) => {
      this.router.navigate(path, { queryParams, ...extras });
    })
  );

  @Effect({ dispatch: false })
  navigateBack$ = this.actions$.pipe(
    ofType(routerActions.BACK),
    tap(() => this.location.back())
  );

  @Effect({ dispatch: false })
  navigateForward$ = this.actions$.pipe(
    ofType(routerActions.BACK),
    tap(() => this.location.forward())
  );
}
