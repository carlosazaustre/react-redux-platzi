import React, { PropTypes } from 'react';

import PostBody from '../../posts/containers/Post';
import Loading from '../../shared/components/Loading';
import Comment from '../../comments/components/Comment';
import API from '../../api';

class Post extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      user: {},
      post: {},
      comments: [],
    };
  }

  componentDidMount() {
    this.initialFetch();
  }

  async initialFetch() {
    const [post, comments] = await Promise.all([
      API.posts.getSingle(this.props.params.id),
      API.posts.getComments(this.props.params.id),
    ]);

    const user = await API.users.getSingle(post.userId);

    this.setState({
      loading: false,
      post,
      user,
      comments,
    });
  }

  render() {
    if (this.state.loading) {
      return <Loading />;
    }

    return (
      <section name="post">
        <PostBody
          user={this.state.user}
          comments={this.state.comments}
          {...this.state.post}
        />
        <section>
          {this.state.comments.map(comment => (
            <Comment key={comment.id} {...comment} />
          ))}
        </section>
      </section>
    );
  }
}

Post.propTypes = {
  params: PropTypes.shape({
    id: PropTypes.string,
  }),
};

export default Post;
