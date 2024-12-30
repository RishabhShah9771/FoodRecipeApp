import { useContext } from "react";
import Modal from "./UI/Modal";
import CartContext from "../Store/CartContext";
import { currencyFormatter } from "../Util/formatting.js";
import Button from "./UI/Button.jsx";
import UserProgressContext from "../Store/UserProgressContext.jsx";
import CartItem from "./CartItem.jsx";

const Cart = () => {
    const cartCtx = useContext(CartContext);
    const userProgressCtx = useContext(UserProgressContext);

    const carttotal = cartCtx.items.reduce(
        (totalPrice, item) => totalPrice + item.quantity * item.price,
        0
    );

    const handleCloseCart = () => {
        userProgressCtx.hideCart();
    };

    const handleGoTocheckOut = () => {
        userProgressCtx.showCheckout();
    };
    return (
        <Modal
            className="cart"
            open={userProgressCtx.progress === "cart"}
            onClose={userProgressCtx.progress === "cart" ? handleCloseCart : null}
        >
            <h2>YOUR CART</h2>
            <ul>
                {cartCtx.items.map((item) => (
                  <CartItem
                      key={item.id}
                      name={item.name}
                      quantity={item.quantity}
                      price={item.price}
                      onIncrease={() => cartCtx.addItem(item)}
                      onDecrease={() => cartCtx.removeItem(item.id)}
                  />
              ))}
            </ul>
            <p className="cart-total">{currencyFormatter.format(carttotal)}</p>
            <p className="modal-actions">
                <Button textOnly onClick={handleCloseCart}>
                    Close
                </Button>
                {cartCtx.items.length > 0 && (
                    <Button onClick={handleGoTocheckOut}>Go to Checkout</Button>
                )}
            </p>
        </Modal>
    );
};
export default Cart;
