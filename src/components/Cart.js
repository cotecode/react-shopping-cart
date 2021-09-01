import React from "react";
import formatCurrency from "../util";

const Cart = ({ cartItems, removeFromCart }) => {
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
              <button className="button primary">Proceed</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
