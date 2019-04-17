import { Epic } from "../store.types";
import { Observable } from "rxjs";
import { ajax, AjaxResponse } from "rxjs/ajax";
import { map, switchMap } from "rxjs/operators";
import { ApplicationState, Action } from "../store.types";
import { ofType } from "../store.utils";
import { getPostsSuccess, ActionType } from "../store.actions";

export const getPostsEpic: Epic = (
  action$: Observable<Action<void>>,
  state$: Observable<ApplicationState>
) =>
  action$.pipe(
    ofType(ActionType.GET_POSTS_REQUEST), // filtering for get posts request action
    switchMap((action: Action) =>
      ajax.get("https://jsonplaceholder.typicode.com/posts").pipe(
        // dispatch another action in return
        map((response: AjaxResponse) => getPostsSuccess(response.response))
      )
    )
  );
