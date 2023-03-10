import './styles.css';
import { useState, useEffect, useCallback } from 'react';
import { loadPosts } from '../../utils/load-posts';
import { Posts } from '../../components/Posts';
import { Button } from '../../components/Button';
import { TextInput } from '../../components/TextInput';

//React com HOOKS
export const HomeHook = () => {
  const [posts, setPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [postsPerPage] = useState(3);
  const [searchValue, setSearchValue] = useState('');

  const noMorePosts = page + postsPerPage >= allPosts.length;
  const filtedPosts = searchValue
    ? posts.filter((post) => post.title.toLowerCase().includes(searchValue.toLowerCase()))
    : posts;

  const handleLoadPosts = useCallback(async (page, postsPerPage) => {
    const postsAndPhotos = await loadPosts();

    setPosts(postsAndPhotos.slice(page, postsPerPage));
    setAllPosts(postsAndPhotos);
  }, []);

  const loadMorePosts = () => {
    const nextPage = page + postsPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);
    posts.push(...nextPosts);

    setPosts(posts);
    setPage(nextPage);
  };

  const handleSearch = (e) => {
    const { value } = e.target;

    setSearchValue(value);
  };

  useEffect(() => {
    handleLoadPosts(0, postsPerPage);
  }, [handleLoadPosts, postsPerPage]);

  return (
    <section className="container">
      <div className="search-container">
        {!!searchValue && <h1> Search value: {searchValue} </h1>}
        <TextInput searchValue={searchValue} handleSearch={handleSearch} />
      </div>

      {filtedPosts.length > 0 && <Posts posts={filtedPosts} />}
      {filtedPosts.length === 0 && <p>Não existe posts</p>}
      <div className="button-container">
        {!searchValue && <Button text="Load" onClick={loadMorePosts} disabled={noMorePosts} />}
      </div>
    </section>
  );
};

/* REACT BASICO
export class Home extends Component {

  state = { posts: [], allPosts: [], page: 0, postsPerPage: 3, searchValue: '' };

  async componentDidMount() {
    await this.loadPosts();
  }

  loadPosts = async () => {
    const { page, postsPerPage } = this.state;
    const postsAndPhotos = await loadPosts();
    this.setState({ posts: postsAndPhotos.slice(page, postsPerPage), allPosts: postsAndPhotos });
  }

  loadMorePosts = () => {
    const { page, postsPerPage, allPosts, posts } = this.state;

    const nextPage = page + postsPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);
    posts.push(...nextPosts);

    this.setState({ posts, page: nextPage });

  }

  handleSearch = (e) => {
    const { value } = e.target;
    this.setState({ searchValue: value });
  }

  render() {
    const { posts, page, postsPerPage, allPosts, searchValue } = this.state;
    const noMorePosts = page + postsPerPage >= allPosts.length;
    const filtedPosts = !!searchValue ? posts.filter(post => post.title.toLowerCase().includes(searchValue.toLowerCase())) : posts;
    return (
      <section className="container">

        <div className="search-container">
          {!!searchValue && (
            <h1> Search value: {searchValue} </h1>
          )}
          <TextInput searchValue={searchValue} handleSearch={this.handleSearch} />
        </div>

        {filtedPosts.length > 0 && (
          <Posts posts={filtedPosts} />
        )}
        {filtedPosts.length === 0 && (
          <p>Não existe posts</p>
        )}
        <div className='button-container'>
          {!searchValue && (
            <Button text="Load" onClick={this.loadMorePosts} disabled={noMorePosts} />
          )}

        </div>

      </section>
    );
  }
}

*/
