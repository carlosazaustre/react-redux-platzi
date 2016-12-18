import { combineReducers } from 'redux-immutable';
import {
  fromJS,
  Map as map,
} from 'immutable';

const initialState = fromJS({
  posts: {
    page: 1,
    entities: {},
  },
  comments: {},
  users: {},
});

function postPageReducer(state = initialState.get('posts').get('page'), action = {}) {
  switch (action.type) {
    case 'SET_POST':
      return state + 1;

    default:
      return state;
  }
}

function postEntitiesReducer(state = initialState.get('posts').get('entities'), action = {}) {
  switch (action.type) {
    case 'SET_POST':
      return action.payload.reduce(
        (posts, post) => posts.set(post.id, map(post)),
        state,
      );

    default:
      return state;
  }
}

const postsReducer = combineReducers({
  page: postPageReducer,
  entities: postEntitiesReducer,
});

function commentsReducer(state = initialState.get('comments'), action = {}) {
  switch (action.type) {
    case 'SET_COMMENTS':
      return action.payload.reduce(
        (comments, comment) => comments.set(comment.id, map(comment)),
        state,
      );

    default:
      return state;
  }
}

function userReducer(state = initialState.get('users'), action = {}) {
  switch (action.type) {
    case 'SET_USER':
      return state.set(action.payload.id, map(action.payload));

    default:
      return state;
  }
}

const reducer = combineReducers({
  posts: postsReducer,
  comments: commentsReducer,
  users: userReducer,
});


export default reducer;
