import React, { useState, useEffect } from "react";
import { Provider } from "react-redux";
import Cart from "./components/Cart";
import Filter from "./components/Filter";
import Products from "./components/Products";
import data from "./data.json";

import store from "./store";

const App = () => {
  const [cartItems, setCartItems] = useState(
    localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : []
  );

  // console.log(products);

  // add Cart
  const addToCart = (product) => {
    const cartItem = cartItems.slice();
    let alreadyInCart = false;
    // console.log(cartItem);

    cartItem.forEach((item) => {
      if (item._id === product._id) {
        item.count++;
        alreadyInCart = true;
      }
    });
    if (!alreadyInCart) {
      cartItem.push({ ...product, count: 1 });
    }
    setCartItems(cartItem);
    localStorage.setItem("cartItems", JSON.stringify(cartItem));
  };

  // remove from cart
  const removeFromCart = (product) => {
    const newCartItem = cartItems.filter((item) => item._id !== product._id);
    setCartItems(newCartItem);
    localStorage.setItem("cartItems", JSON.stringify(newCartItem));
  };

  // create order
  const createOrder = (order) => {
    alert("Need to save order for " + order.name);
  };

  return (
    <Provider store={store}>
      <div className="grid-container">
        <header>
          <a href="/">React Shopping Cart!</a>
        </header>
        <main>
          <div className="content">
            <div className="main">
              <Filter />
              <Products addToCart={addToCart} />
            </div>
            <div className="sidebar">
              <Cart
                cartItems={cartItems}
                removeFromCart={removeFromCart}
                createOrder={createOrder}
              />
            </div>
          </div>
        </main>
        <footer>All right is reserved</footer>
      </div>
    </Provider>
  );
};

export default App;
