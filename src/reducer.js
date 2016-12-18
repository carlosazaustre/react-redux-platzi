import { combineReducers } from 'redux';

const initialState = {
  posts: {
    page: 1,
    entities: [],
  },
  comments: [],
  users: {},
};

function postPageReducer(state = initialState.posts.page, action = {}) {
  switch (action.type) {
    case 'SET_POST':
      return state + 1;

    default:
      return state;
  }
}

function postEntitiesReducer(state = initialState.posts.entities, action = {}) {
  switch (action.type) {
    case 'SET_POST':
      return state.concat(action.payload);

    default:
      return state;
  }
}

const postsReducer = combineReducers({
  page: postPageReducer,
  entities: postEntitiesReducer,
});

function commentsReducer(state = initialState.comments, action = {}) {
  switch (action.type) {
    case 'SET_COMMENTS':
      return state.concat(action.payload);

    default:
      return state;
  }
}

function userReducer(state = initialState.users, action = {}) {
  switch (action.type) {
    case 'SET_USER':
      return Object.assign({}, state, {
        [action.payload.id]: action.payload,
      });

    default:
      return state;
  }
}

const rootReducer = combineReducers({
  posts: postsReducer,
  comments: commentsReducer,
  users: userReducer,
});


export default rootReducer;
