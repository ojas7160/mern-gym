import * as actionTypes from '../actions/post-action';

const initialState = {
  posts: [],
  post: {}
}

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.UPDATE_POSTS:
      return {
        ...state,
        posts: action.posts
      }
    case actionTypes.ONINIT_POSTS:
      console.log(action.posts)
      return {
        ...state,
        posts: action.posts
      }
    default:
      return state;
  }
}

export default reducer;