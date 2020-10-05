import { useContext, useState } from 'react';

import OrderContext from '../components/OrderContext';
import attachNamesAndPrices from './attachNamesAndPrices';
import calculateOrderTotal from './calculateOrderTotal';
import formatMoney from './formatMoney';

export default function usePizza({ pizzas, values }) {
  // create state to hold order
  // Old state before we move to provider
  //   const [order, setOrder] = useState([]);
  // now we access via context
  const [order, setOrder] = useContext(OrderContext);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

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
  // function that is run when form is submitted
  async function submitOrder(e) {
    e.preventDefault();
    console.log(values);
    setLoading(true);
    // gather all data that needs to be sent
    const body = {
      order: attachNamesAndPrices(order, pizzas),
      total: formatMoney(calculateOrderTotal(order, pizzas)),
      name: values.name,
      email: values.email,
    };
    console.log(body);
  }
  // send this data to a serverless function when they check out.
  // TODO

  return {
    order,
    addToOrder,
    removeFromOrder,
    error,
    loading,
    message,
    submitOrder,
  };
}
