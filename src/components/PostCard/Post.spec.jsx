import {render, screen} from '@testing-library/react';
import { PostCard} from '.';


const mock = {
    title: 'title',
    body: 'body',
    id: 1,
    cover: 'img/img.jpg',
}

describe('<PostCard />', () => {
    it('should render PostCard correctly', () => {
       render(<PostCard {...mock} />);

       expect(screen.getByRole('img', {name: /title/i})).toHaveAttribute('src', mock.cover);
       expect(screen.getByRole('heading', {name: /title/i})).toBeInTheDocument();
       expect(screen.getByText('body')).toBeInTheDocument();
    })

    it('should match snapshot', () => {
      const {container} = render(<PostCard {...mock} />);
      
      expect(container).toMatchSnapshot();
     })
})