import { Button} from '.';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
describe('<Button text="load more" />', ()=> {
    it('should render the button with the text "Load more"', ()=> {
        render(<Button text="Load more" />);

        const button = screen.getByRole('button', { name: /load more/i });
        expect(button).toBeInTheDocument();
    });

    it('should call function on button click', ()=> {
        const fn = jest.fn();
        render(<Button text="Load more" onClick={fn} />);

        const button = screen.getByRole('button', { name: /load more/i });

       
        userEvent.click(button);
        expect(fn).toHaveBeenCalledTimes(1);
    });

    it('should be disable when disabled is true', ()=> {
        
        render(<Button text="Load more" disabled={true} />);

        const button = screen.getByRole('button', { name: /load more/i });

       expect(button).toBeDisabled();
    });

    it('should match snapshot', ()=> {
        
       const {container} = render(<Button text="Load more" disabled={true} />);

       expect(container).toMatchSnapshot();
    });
})