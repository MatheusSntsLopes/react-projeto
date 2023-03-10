import { Posts } from '.';
import { render, screen } from '@testing-library/react';

const props = {
  posts: [
    {
      id: 1,
      title: 'title 1',
      body: 'body 1',
      cover: 'img/img1.jpg',
    },
    {
      id: 2,
      title: 'title 2',
      body: 'body 2',
      cover: 'img/img2.jpg',
    },
    {
      id: 3,
      title: 'title 3',
      body: 'body 3',
      cover: 'img/img3.jpg',
    },
  ],
};

describe('<Posts />', function () {
  it('should render posts', () => {
    render(<Posts {...props} />);
    expect(screen.getAllByRole('heading', { name: /title/i })).toHaveLength(3);
    expect(screen.getAllByRole('img', { name: /title/i })).toHaveLength(3);
    expect(screen.getAllByText(/body/i)).toHaveLength(3);
  });

  it('should not render posts', () => {
    render(<Posts />);

    expect(screen.queryByRole('heading', { name: /title/i })).not.toBeInTheDocument();
  });

  it('should match snapshot', () => {
    const { container } = render(<Posts {...props} />);

    expect(container).toMatchSnapshot();
  });
});
