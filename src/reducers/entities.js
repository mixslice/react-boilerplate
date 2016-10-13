import merge from 'lodash.merge';


export default (state = {
  // todos: {}
}, action) => {
  if (action.response && action.response.entities) {
    return merge({}, state, action.response.entities);
  } else if (action.response) {
    const response = {};
    response[action.entity] = action.response;
    return merge({}, state, response);
  }
  return state;
};
