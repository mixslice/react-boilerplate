import { normalize } from 'normalizr';
import { camelizeKeys } from 'humps';
import 'isomorphic-fetch';
import merge from 'lodash.merge';


// Fetches an API response and normalizes the result JSON according to schema.
// This makes every API response have the same shape, regardless of how nested it was.
function callApi(endpoint, schema, options, isFake) {
  const API_ROOT = isFake ? '/data/' : __API_ROOT__;
  const fullUrl = (endpoint.indexOf(API_ROOT) === -1)
    ? API_ROOT + endpoint
    : endpoint;

  const customOptions = merge({}, options, {
    method: isFake ? 'get' : options && options.method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });

  return fetch(fullUrl, customOptions)
    .then(response =>
      response.json().then(json => ({ json, response }))
    ).then(({ json, response }) => {
      if (!response.ok) {
        return Promise.reject(json);
      }

      const camelizedJson = camelizeKeys(json);
      if (schema) {
        return Object.assign({},
          normalize(camelizedJson, schema)
        );
      }
      return camelizedJson;
    });
}

// Action key that carries API call info interpreted by this Redux middleware.
export const CALL_API = Symbol('Call API');

// A Redux middleware that interprets actions with CALL_API info specified.
// Performs the call and promises when such actions are dispatched.
export default store => next => (action) => {
  const callAPI = action[CALL_API];
  if (typeof callAPI === 'undefined') {
    return next(action);
  }

  let { endpoint } = callAPI;
  // const { schema, types } = callAPI;
  const {
    schema,
    types,
    options,
    isFake = false,
    entity,
  } = callAPI;

  if (typeof endpoint === 'function') {
    endpoint = endpoint(store.getState());
  }

  if (typeof endpoint !== 'string') {
    throw new Error('Specify a string endpoint URL.');
  }
  // if (!schema) {
  //   throw new Error('Specify one of the exported Schemas.');
  // }
  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error('Expected an array of three action types.');
  }
  if (!types.every(type => typeof type === 'string')) {
    throw new Error('Expected action types to be strings.');
  }

  function actionWith(data) {
    const finalAction = Object.assign({}, action, data);
    delete finalAction[CALL_API];
    return finalAction;
  }

  const [requestType, successType, failureType] = types;
  next(actionWith({ type: requestType }));

  return callApi(endpoint, schema, options, isFake).then(
    response => next(actionWith({
      response,
      type: successType,
      entity,
    })),
    error => next(actionWith({
      type: failureType,
      error: error || new Error('Something bad happened'),
    }))
  );
};
