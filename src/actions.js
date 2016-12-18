import API from './api';

function setPost(post) {
  return {
    type: 'SET_POST',
    payload: post,
  };
}

function setComments(comments) {
  return {
    type: 'SET_COMMENTS',
    payload: comments,
  };
}

function setUser(user) {
  return {
    type: 'SET_USER',
    payload: user,
  };
}

function postsNextPage() {
  return async (dispatch, getState) => {
    const state = getState();
    const currentPage = state.get('posts').get('page');

    const posts = await API.posts.getList(currentPage);
    dispatch(setPost(posts));

    return posts;
  };
}

function loadUser(userId) {
  return async (dispatch) => {
    const user = await API.users.getSingle(userId);
    dispatch(setUser(user));

    return user;
  };
}

function loadCommentsForPost(postId) {
  return async (dispatch) => {
    const comments = await API.posts.getComments(postId);
    dispatch(setComments(comments));

    return comments;
  };
}

export {
  setPost,
  setComments,
  setUser,

  postsNextPage,
  loadUser,
  loadCommentsForPost,
};
