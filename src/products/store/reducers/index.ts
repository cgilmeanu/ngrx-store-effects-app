import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector
} from '@ngrx/store';
import * as fromPizzas from './pizzas.reducer';

export interface ProductState {
  pizzas: fromPizzas.PizzaState;
}

export const reducers: ActionReducerMap<ProductState> = {
  pizzas: fromPizzas.reducer
};

export const getProductsState = createFeatureSelector<ProductState>('products');

// pizzas state
export const getPizzaState = createSelector(
  getProductsState,
  (state: ProductState) => state.pizzas
);

export const getPizzasEntities = createSelector(
  getPizzaState,
  fromPizzas.getPizzasEntities
);

export const getAllPizzas = createSelector(
  getPizzasEntities,
  entities => {
    return Object.keys(entities).map(id => entities[parseInt(id, 10)]);
  }
);

export const getAllPizzasLoaded = createSelector(
  getPizzaState,
  fromPizzas.getPizzasLoaded
);

export const getAllPizzasLoading = createSelector(
  getPizzaState,
  fromPizzas.getPizzasLoading
);
