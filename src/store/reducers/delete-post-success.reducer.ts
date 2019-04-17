import { Reducer, ApplicationState, Action } from "../store.types";

export const deletePostSuccessReducer: Reducer = (
  previousState: ApplicationState,
  action: Action<string> // action.payload = post id
): ApplicationState => {
  const posts = { ...previousState.posts };
  const deletingPosts = { ...previousState.deletingPosts };

  delete posts[action.payload];
  delete deletingPosts[action.payload];

  return {
    ...previousState,
    deletingPosts,
    posts
  };
};
