import calculatePizzaPrice from './calculatePizzaPrice';

export default function calculateOrderTotal(order, pizzas) {
  // loop over each item
  return order.reduce((runningTotal, singleOrder) => {
    const pizza = pizzas.find((thisPizza) => thisPizza.id === singleOrder.id);
    return runningTotal + calculatePizzaPrice(pizza.price, singleOrder.size);
  }, 0);
}
