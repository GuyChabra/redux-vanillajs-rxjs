import { Reducer, ApplicationState, Action } from "../store.types";

export const deletePostRequestReducer: Reducer = (
  previousState: ApplicationState,
  action: Action<string> // action.payload = post id
): ApplicationState => ({
  ...previousState,
  deletingPosts: {
    ...previousState.deletingPosts,
    [action.payload]: true
  }
});
