import { useContext, useState } from 'react';

import OrderContext from '../components/OrderContext';

export default function usePizza({ pizzas, inputs }) {
  // create state to hold order
  // Old state before we move to provider
  //   const [order, setOrder] = useState([]);
  // now we access via context
  const [order, setOrder] = useContext(OrderContext);

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
