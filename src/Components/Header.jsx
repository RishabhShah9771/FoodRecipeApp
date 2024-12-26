import logoImg from "../assets/logo.jpg";
import Button from "./UI/Button.jsx";

const Header = () => {
    return (
        <header id="main-header">
            <div id="title">
                <img src={logoImg} />
                <h1>Food shop</h1>
            </div>
            <nav>
              <Button textOnly={true}>Cart</Button>
          </nav>
      </header>
  );
};
export default Header;
