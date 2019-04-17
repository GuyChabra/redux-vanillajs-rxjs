import { Action, Reducer, ApplicationState } from "./store.types";
import { ActionType } from "./store.actions";
import * as Reducers from "./reducers";

/**
 * Create an initial state.
 * This will be the initial state of the application
 */
const initialState: ApplicationState = {
  posts: {},
  deletingPosts: {}
};

/**
 * The Application Reducer
 * @param state: current application state
 * @param action: the current action fired in the application
 * @returns state: the new application state
 */
const reducer: Reducer = (
  prevState: ApplicationState = initialState,
  action: Action
): ApplicationState => {
  console.log("reducer", action);

  switch (action.type) {
    case ActionType.GET_POSTS_SUCCESS:
      return Reducers.getPostsSuccessReducer(prevState, action);

    case ActionType.DELETE_POST_REQUEST:
      return Reducers.deletePostRequestReducer(prevState, action);

    case ActionType.DELETE_POST_SUCCESS:
      return Reducers.deletePostSuccessReducer(prevState, action);
  }

  return prevState;
};

export default reducer;
