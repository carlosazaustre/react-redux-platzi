import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';

import API from '../../api';
import styles from './Post.css';

class Post extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      user: props.user || null,
      comments: props.comments || null,
    };
  }

  componentDidMount() {
    this.initialFetch();
  }

  async initialFetch() {
    if (!!this.state.user && !!this.state.comments) return this.setState({ loading: false });

    const [user, comments] = await Promise.all([
      !this.state.user ? API.users.getSingle(this.props.userId) : Promise.resolve(null),
      !this.state.comments ? API.posts.getComments(this.props.id) : Promise.resolve(null),
    ]);

    return this.setState({
      user: user || this.state.user,
      comments: comments || this.state.comments,
      loading: false,
    });
  }

  render() {
    return (
      <article id={`post-${this.props.id}`} className={styles.post}>
        <h2 className={styles.title}>
          <Link to={`/post/${this.props.id}`}>
            {this.props.title}
          </Link>
        </h2>
        <p className={styles.body}>
          {this.props.body}
        </p>
        {!this.state.loading && (
          <div className={styles.meta}>
            <Link to={`/user/${this.state.user.id}`} className={styles.user}>
              {this.state.user.name}
            </Link>
            <span className={styles.comments}>
              <FormattedMessage
                id="post.meta.comments"
                values={{
                  amount: this.state.comments.length,
                }}
              />
            </span>
            <Link to={`/post/${this.props.id}`}>
              <FormattedMessage id="post.meta.readMore" />
            </Link>
          </div>
        )}
      </article>
    );
  }
}

Post.propTypes = {
  id: PropTypes.number,
  userId: PropTypes.number,
  title: PropTypes.string,
  body: PropTypes.string,
  user: PropTypes.shape({
    name: PropTypes.string,
  }),
  comments: PropTypes.arrayOf(
    PropTypes.object,
  ),
};

export default Post;
