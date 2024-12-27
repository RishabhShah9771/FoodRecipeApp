import { useContext } from "react";
import logoImg from "../assets/logo.jpg";
import Button from "./UI/Button.jsx";
import CartContext from "../Store/CartContext.jsx";

const Header = () => {
    const cartCtx = useContext(CartContext);
    const totalCartItems = cartCtx.items.reduce((totalNumberOfItems, item) => {
        return totalNumberOfItems + item.quantity;
    }, 0);

    return (
        <header id="main-header">
            <div id="title">
                <img src={logoImg} />
                <h1>Food shop</h1>
            </div>
            <nav>
              <Button textOnly={true}>Cart({totalCartItems})</Button>
          </nav>
      </header>
  );
};
export default Header;
