import React, { useState } from "react";
import formatCurrency from "../util";

const Cart = ({ cartItems, removeFromCart, createOrder }) => {
  const [showCheckout, setShowCheckout] = useState(false);

  // input state
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");

  const submitOrder = (e) => {
    e.preventDefault();
    const order = {
      name,
      email,
      address,
      cartItems,
    };
    createOrder(order);
  };

  return (
    <>
      <div>
        {cartItems.length === 0 ? (
          <div className="cart cart-header">Cart is empty</div>
        ) : (
          <div className="cart cart-header">You have {cartItems.length}</div>
        )}
      </div>
      <div>
        <div className="cart">
          <ul className="cart-items">
            {cartItems.map((item) => (
              <li key={item._id}>
                <div>
                  <img src={item.image} alt={item.title} />
                </div>
                <div>
                  <div>{item.title}</div>
                  <div className="right">
                    {formatCurrency(item.price)} x {item.count}{" "}
                    <button
                      onClick={() => removeFromCart(item)}
                      className="button"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        {cartItems.length > 0 && (
          <>
            <div className="cart">
              <div className="total">
                <div>
                  Total:{" "}
                  {formatCurrency(
                    cartItems.reduce(
                      (acc, currItem) => acc + currItem.price * currItem.count,
                      0
                    )
                  )}
                </div>
                <button
                  onClick={() => setShowCheckout(true)}
                  className="button primary"
                >
                  Proceed
                </button>
              </div>
            </div>
            {showCheckout && (
              <div className="cart">
                <form onSubmit={submitOrder}>
                  <ul className="form-container">
                    <li>
                      <label htmlFor="">Email</label>
                      <input
                        type="email"
                        name="email"
                        id=""
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </li>
                    <li>
                      <label htmlFor="">Name</label>
                      <input
                        type="text"
                        name="name"
                        id=""
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </li>
                    <li>
                      <label htmlFor="">Address</label>
                      <input
                        type="text"
                        name="address"
                        id=""
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                      />
                    </li>
                    <li>
                      <button className="button primary" type="submit">
                        Checkout
                      </button>
                    </li>
                  </ul>
                </form>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default Cart;
