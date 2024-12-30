import { useContext } from "react";
import Modal from "./UI/Modal";
import CartContext from "../Store/CartContext";
import { currencyFormatter } from "../Util/formatting";
import Input from "./UI/Input";
import Button from "./UI/Button";
import UserProgressContext from "../Store/UserProgressContext";
import useHttp from "../hooks/useHttp";
import { useActionState } from "react";

const requestConfig = {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
};

export default function Checkout() {
    const cartCtx = useContext(CartContext);
    const userProgressCtx = useContext(UserProgressContext);

    const { data, error, sendRequest, clearData } = useHttp(
        "http://localhost:3000/orders",
        requestConfig
    );

    const cartTotal = cartCtx.items.reduce(
        (totalPrice, item) => totalPrice + item.quantity * item.price,
        0
    );

    function handleCloseCheckout() {
        userProgressCtx.hideCheckout();
    }

    function handleFinishCheckout() {
        userProgressCtx.hideCheckout();
        cartCtx.clearCart();
        clearData();
    }

    async function checkOutAction(prevState, fd) {
        const customerData = Object.fromEntries(fd.entries());

        await sendRequest(
            JSON.stringify({
                order: {
                    items: cartCtx.items,
                    customer: customerData,
                },
            })
        );
    }

    const [formState, formAction, isSending] = useActionState(
        checkOutAction,
        null
    );

    let actions = (
        <>
            <Button type="button" textOnly onClick={handleCloseCheckout}>
                Close
            </Button>
            <Button>Submit Order</Button>
        </>
    );

    if (isSending) {
        actions = <span>Sending order data...</span>;
    }

    if (data && !error) {
    return (
        <Modal
            open={userProgressCtx.progress === "checkout"}
            onClose={handleCloseCheckout}
        >
                <h2>Sucess!!</h2>
                <p>Your order was submitted successfully!</p>
                <p className="modal-actions">
                    <Button onClick={handleFinishCheckout}>Okay</Button>
                </p>
            </Modal>
        );
    }
    return (
        <Modal
            open={userProgressCtx.progress === "checkout"}
            onClose={handleCloseCheckout}
        >
            <form action={formAction}>
                <h2>Checkout</h2>
                <p>Total Amount: {currencyFormatter.format(cartTotal)}</p>
                <Input label="Full Name" type="text" id="name" />
                <Input label="Email" type="email" id="email" />
                <Input label="Address" type="text" id="street" />
                <div className="control-row">
                    <Input label="Postal Code" type="text" id="postal-code" />
                    <Input label="City" type="text" id="city" />
                </div>

                {error && <Error title="Failed to Submit Order" message={error} />}

                <p className="modal-actions">{actions}</p>
            </form>
        </Modal>
    );
}
