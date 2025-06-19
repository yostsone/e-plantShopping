import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { calculateTotalQty, removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping, setAddedToCart }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  // Calculate total amount for all products in the cart
  const calculateTotalAmount = () => {
    var totalAmount = 0;
    cart.map(({cost, quantity}) => {
      var stripedValue = cost.replace(/[$,]/g,"");
      var parsedValue = parseInt(stripedValue);

      if (parsedValue == stripedValue) {
          totalAmount = totalAmount + (parsedValue * quantity);
      }
    });

    return totalAmount;
  };

    // Calculate total cost based on quantity for an item
    const calculateTotalCost = (item) => {
        const { cost, quantity } = item;
        var totalAmount = 0;
        var stripedValue = cost.replace(/[$,]/g,"");
        var parsedValue = parseInt(stripedValue);

        if (parsedValue == stripedValue) {
            totalAmount = totalAmount + (parsedValue * quantity);
        }

        return totalAmount;
    };

  const handleContinueShopping = (e) => {
      onContinueShopping(e);
  };

    const handleCheckoutShopping = (e) => {
        alert('Functionality to be added for future reference');
    };

  const handleIncrement = (item) => {
      const { quantity } = item;
      const updatedItem = { ...item, quantity: quantity +1 };
      dispatch(updateQuantity(updatedItem));
      dispatch(calculateTotalQty());
  };

  const handleDecrement = (item) => {
      const { quantity } = item;
      if (quantity < 2) {
          dispatch(removeItem(item))
      } else {
          const updatedItem = { ...item, quantity: quantity - 1 };
          dispatch(updateQuantity(updatedItem));
      }
      dispatch(calculateTotalQty());
  };

  const handleRemove = (item) => {
      dispatch(removeItem(item))
      dispatch(calculateTotalQty());
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
      <div>
        {cart.map(item => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">{item.cost}</div>
              <div className="cart-item-quantity">
                <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
              </div>
              <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
              <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'></div>
      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={(e) => handleContinueShopping(e)}>Continue Shopping</button>
        <br />
        <button className="get-started-button1" onClick={(e) => handleCheckoutShopping(e)}>Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;


