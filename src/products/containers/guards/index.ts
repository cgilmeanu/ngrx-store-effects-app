import { PizzaGuard } from './pizzas.guard';
import { PizzaExitsGuard } from './pizza-exists.guard';
import { ToppingsGuard } from './toppings.guard';

export const guards: any[] = [PizzaGuard, PizzaExitsGuard, ToppingsGuard];

export * from './pizzas.guard';
export * from './pizza-exists.guard';
export * from './toppings.guard';
