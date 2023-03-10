import { TextInput } from ".";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("<TextInput />", function () {
  it("should have a value of searchValue", () => {
    const fn = jest.fn();
    render(<TextInput handleSearch={fn} searchValue={"teste"} />);

    const input = screen.getByPlaceholderText(/type your search/i);
    expect(input).toBeInTheDocument();

    expect(input.value).toBe("teste");
  });

  it("should call handleSearch function on each key pressed", () => {
    const fn = jest.fn();
    render(<TextInput handleSearch={fn} searchValue={"teste"} />);

    const input = screen.getByPlaceholderText(/type your search/i);
    const value = "o valor";

    userEvent.type(input, value);

    expect(input.value).toBe("teste");
    expect(fn).toHaveBeenCalledTimes(value.length);
  });

  it("should match snapshot", () => {
    const fn = jest.fn();
    const { container } = render(
      <TextInput handleSearch={fn} searchValue={""} />
    );

    expect(container).toMatchSnapshot();
  });
});
