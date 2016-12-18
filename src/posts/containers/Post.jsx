import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import actions from '../../actions';
import styles from './Post.css';

class Post extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
    };
  }

  componentDidMount() {
    this.initialFetch();
  }

  async initialFetch() {
    if (!!this.props.user && !!this.props.comments) return this.setState({ loading: false });


    await Promise.all([
      this.props.actions.loadUser(this.props.userId),
      this.props.actions.loadCommentsForPost(this.props.id),
    ]);

    return this.setState({ loading: false });
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
            <Link to={`/user/${this.props.user.id}`} className={styles.user}>
              {this.props.user.name}
            </Link>
            <span className={styles.comments}>
              <FormattedMessage
                id="post.meta.comments"
                values={{
                  amount: this.props.comments.length,
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
    id: PropTypes.number,
    name: PropTypes.string,
  }),
  comments: PropTypes.arrayOf(PropTypes.object),
  actions: PropTypes.objectOf(PropTypes.func),
};

function mapStateToProps(state, props) {
  return {
    comments: state.comments.filter(comment => comment.postId === props.id),
    user: state.users[props.userId],
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Post);
