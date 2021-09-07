import React, { useState } from "react";
import formatCurrency from "../util";
import Fade from "react-reveal/Fade";
import { connect } from "react-redux";
import { removeFromCart } from "../actions/cartActions";
import { createOrder, clearOrder } from "../actions/orderActions";
import Modal from "react-modal";
import Zoom from "react-reveal";

const Cart = ({
  cartItems,
  removeFromCart,
  createOrder,
  order,
  clearOrder,
}) => {
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
      total: cartItems.reduce((a, c) => a + c.price * c.count, 0),
    };
    createOrder(order);
  };

  const closeModal = () => {
    clearOrder();
  };

  return (
    <>
      <div>
        {cartItems.length === 0 ? (
          <div className="cart cart-header">Cart is empty</div>
        ) : (
          <div className="cart cart-header">You have {cartItems.length}</div>
        )}
        {order && (
          <Modal isOpen={true} onRequestClose={closeModal}>
            <Zoom>
              <button className="close-modal" onClick={closeModal}>
                x
              </button>
              <div className="order-details">
                <h3 className="success-message">Your order has been placed.</h3>
                <h2>Order {order._id}</h2>
                <ul>
                  <li>
                    <div>Name:</div>
                    <div>{order.name}</div>
                  </li>
                  <li>
                    <div>Email:</div>
                    <div>{order.email}</div>
                  </li>
                  <li>
                    <div>Address:</div>
                    <div>{order.address}</div>
                  </li>
                  <li>
                    <div>Date:</div>
                    <div>{order.createdAt}</div>
                  </li>
                  <li>
                    <div>Total:</div>
                    <div>{formatCurrency(order.total)}</div>
                  </li>
                  <li>
                    <div>Cart Items:</div>
                    <div>
                      {order.cartItems.map((item) => (
                        <div>
                          {item.count} {" x "} {item.title}
                        </div>
                      ))}
                    </div>
                  </li>
                </ul>
              </div>
            </Zoom>
          </Modal>
        )}
      </div>
      <div>
        <div className="cart">
          <Fade left cascade>
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
          </Fade>
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
              <Fade right cascade>
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
              </Fade>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default connect(
  (state) => ({
    cartItems: state.cart.cartItems,
    order: state.order.order,
  }),
  { removeFromCart, createOrder, clearOrder }
)(Cart);
