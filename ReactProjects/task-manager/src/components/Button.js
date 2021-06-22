import propTypes from "prop-types";

const Button = ({ color, text, onClic }) => {
  return (
    <button onClick={onClic} className="btn" style={{ backgroundColor: color }}>
      {text}
    </button>
  );
};

Button.defaultProp = {
  color: "steelblue",
  text: "add",
};
Button.propTypes = {
  color: propTypes.string,
  text: propTypes.string,
  onClic: propTypes.func,
};

export default Button;
