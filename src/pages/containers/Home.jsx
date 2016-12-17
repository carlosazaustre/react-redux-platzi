import React from 'react';
import { FormattedMessage } from 'react-intl';

import API from '../../api';
import Post from '../../posts/containers/Post';
import Loading from '../../shared/components/Loading';
import Header from '../../shared/components/Header';
import Title from '../../shared/components/Title';

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      page: 1,
      posts: [],
      loading: true,
    };

    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount() {
    this.initialFetch();
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  async initialFetch() {
    const posts = await API.posts.getList(this.state.page);

    this.setState({
      posts,
      page: this.state.page + 1,
      loading: false,
    });
  }

  handleScroll() {
    if (this.state.loading) return null;

    const scrolled = window.scrollY;
    const viewportHeight = window.innerHeight;
    const fullHeigth = document.body.clientHeigth;

    if (!(scrolled + viewportHeight + 300 >= fullHeigth)) {
      return null;
    }

    return this.setState({ loading: true }, async () => {
      try {
        const posts = await API.posts.getList(this.state.page);

        this.setState({
          posts: this.state.posts.concat(posts),
          page: this.state.page + 1,
          loading: false,
        });
      } catch (error) {
        console.error(error);
        this.setState({ loading: false });
      }
    });
  }

  render() {
    return (
      <section name="home">
        <Header />
        <Title>
          <FormattedMessage id="title.home" />
        </Title>

        <section>
          {this.state.posts.map(post => (
            <Post key={post.id} {...post} />
          ))}
          {this.state.loading && (
            <Loading />
          )}
        </section>

      </section>
    );
  }
}

export default Home;
