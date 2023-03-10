import prop from "prop-types";
import { Component } from "react";
import "./styles.css";

export class Button extends Component {
  render() {
    const { text, onClick, disabled } = this.props;
    return (
      <button className="button" onClick={onClick} disabled={disabled}>
        {text}
      </button>
    );
  }
}

Button.propTypes = {
  text: prop.string.isRequired,
  onClick: prop.func.isRequired,
  disabled: prop.bool.isRequired,
};
