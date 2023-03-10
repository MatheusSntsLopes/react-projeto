import prop from "prop-types";
import "./styles.css";

export const TextInput = ({ searchValue, handleSearch }) => {
  return (
    <input
      type="search"
      onChange={handleSearch}
      value={searchValue}
      className="text-input"
      placeholder="type your search"
    />
  );
};

TextInput.propTypes = {
  searchValue: prop.string.isRequired,
  handleSearch: prop.func.isRequired,
};
