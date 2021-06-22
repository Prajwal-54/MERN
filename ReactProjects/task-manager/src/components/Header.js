import Button from "./Button";
import { useLocation } from "react-router-dom";

const Header = ({ title, toggleAddButton, showAdd }) => {
  const Location = useLocation();
  return (
    <header className="header">
      <h2>{title}</h2>
      {Location.pathname !== "/about" && (
        <Button
          color={showAdd ? "orange" : "green"}
          text={showAdd ? "close" : "add"}
          onClic={toggleAddButton}
        />
      )}
    </header>
  );
};

Header.defaultProps = {
  title: "task tracker",
};

//css style in js
// const headerStyling={
//     color:"red",
//     backgroundColor:"black"
// }

export default Header;
