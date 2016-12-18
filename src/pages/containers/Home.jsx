import React, { PropTypes } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import API from '../../api';
import Post from '../../posts/containers/Post';
import Loading from '../../shared/components/Loading';
import Title from '../../shared/components/Title';

import actions from '../../actions';

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      page: props.page || 1,
      posts: props.posts || [],
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
    await this.props.actions.postsNextPage();
    // const posts = await API.posts.getList(this.props.page);

    // this.props.actions.setPost(posts);
    // // this.props.dispatch(
    // //   actions.setPost(posts),
    // // );

    this.setState({ loading: false });
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
        await this.props.actions.postsNextPage();
        // const posts = await API.posts.getList(this.props.page);

        // this.props.actions.setPost(posts);
        // // this.props.dispatch(
        // //   actions.setPost(posts),
        // // );

        this.setState({ loading: false });
      } catch (error) {
        console.error(error);
        this.setState({ loading: false });
      }
    });
  }

  render() {
    return (
      <section name="home">
        <Title>
          <FormattedMessage id="title.home" />
        </Title>

        <section>
          {this.props.posts.map(post => (
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

Home.propTypes = {
  actions: PropTypes.objectOf(PropTypes.func),
  posts: PropTypes.arrayOf(PropTypes.object),
  page: PropTypes.number,
};

function mapStateToProps(state) {
  return {
    posts: state.posts.entities,
    page: state.posts.page,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
