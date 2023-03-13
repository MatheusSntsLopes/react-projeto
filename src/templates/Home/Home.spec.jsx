import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import { HomeHook } from '.';
import userEvent from '@testing-library/user-event';

const handlers = [
  rest.get('*jsonplaceholder.typicode.com*', async (req, res, ctx) => {
    return res(
      ctx.json([
        {
          userId: 1,
          id: 1,
          title: 'title 1',
          body: 'body 1',
          url: 'img1/img.jpg',
        },
        {
          userId: 2,
          id: 2,
          title: 'title 2',
          body: 'body 2',
          url: 'img2/img.jpg',
        },
        {
          userId: 3,
          id: 3,
          title: 'title 3',
          body: 'body 3',
          url: 'img3/img.jpg',
        },
        {
          userId: 4,
          id: 4,
          title: 'title 4',
          body: 'body 4',
          url: 'img4/img.jpg',
        },
        {
          userId: 5,
          id: 5,
          title: 'title 5',
          body: 'body 5',
          url: 'img5/img.jpg',
        },
      ]),
    );
  }),
];

const server = setupServer(...handlers);

describe('<Home />', () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it('should render search , posts and load more', async () => {
    render(<HomeHook />);
    const noMorePosts = screen.getByText('Não existe posts');

    expect.assertions(3);
    await waitForElementToBeRemoved(noMorePosts);

    const search = screen.getByPlaceholderText(/type your search/i);

    expect(search).toBeInTheDocument();

    const images = screen.getAllByRole('img', { name: /title/i });
    expect(images).toHaveLength(3);

    const button = screen.getByRole('button', { name: /Load/i });
    expect(button).toBeInTheDocument();
  });

  it('should search for posts', async () => {
    render(<HomeHook />);
    const noMorePosts = screen.getByText('Não existe posts');
    await waitForElementToBeRemoved(noMorePosts);

    const search = screen.getByPlaceholderText(/type your search/i);
    expect.assertions(10);

    expect(screen.getByRole('heading', { name: /title 1/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /title 2/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /title 3/i })).toBeInTheDocument();

    userEvent.type(search, 'title 1');
    expect(screen.queryByRole('heading', { name: /title 2/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: /title 3/i })).not.toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Search value: title 1' })).toBeInTheDocument();

    userEvent.clear(search);
    expect(screen.getByRole('heading', { name: /title 1/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /title 2/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /title 3/i })).toBeInTheDocument();

    userEvent.type(search, 'skadadka');
    expect(screen.getByText('Não existe posts')).toBeInTheDocument();
  });

  it('should load more posts', async () => {
    render(<HomeHook />);
    const noMorePosts = screen.getByText('Não existe posts');
    await waitForElementToBeRemoved(noMorePosts);

    const button = screen.getByRole('button', { name: /Load/i });

    userEvent.click(button);

    expect(screen.getByRole('heading', { name: 'title 3' })).toBeInTheDocument();

    expect(button).toBeEnabled();
  });
});
