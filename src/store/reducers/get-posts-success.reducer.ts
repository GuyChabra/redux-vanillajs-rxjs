import { Reducer, ApplicationState, Action } from "../store.types";
import { arrayToDict } from "../../utils";

export const getPostsSuccessReducer: Reducer = (
  previousState: ApplicationState,
  action: Action<any[]> // action.payload = post id
): ApplicationState => ({
  ...previousState,
  posts: arrayToDict(action.payload, "id")
});
