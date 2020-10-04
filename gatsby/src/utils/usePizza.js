import { useState } from 'react';

export default function usePizza({ pizzas, inputs }) {
  // create state to hold order
  const [order, setOrder] = useState([]);
  // make function to add to things to order
  function addToOrder(orderedPizza) {
    setOrder([...order, orderedPizza]);
  }
  // remove things from order
  function removeFromOrder(index) {
    setOrder([
      // everything before the item we want to remove
      ...order.slice(0, index),
      // everything after the itme we want to remove
      // slice with one variable goes from what is passed to the end.
      ...order.slice(index + 1),
    ]);
  }
  // send this data to a serverless function when they check out.
  // TODO

  return {
    order,
    addToOrder,
    removeFromOrder,
  };
}
