import { Epic, ApplicationState } from "../store.types";
import { ajax, AjaxResponse } from "rxjs/ajax";
import { map, delay, mergeMap } from "rxjs/operators";
import { Action } from "../store.types";
import { ofType } from "../store.utils";
import { deletePostSuccess, ActionType } from "../store.actions";
import { Observable } from "rxjs";

export const deletePostEpic: Epic = (
  action$: Observable<Action<string>>,
  state$: Observable<ApplicationState>
) =>
  action$.pipe(
    ofType(ActionType.DELETE_POST_REQUEST), // filtering for delete post action
    map((action: Action) => action.payload),
    mergeMap((postId: string) =>
      ajax.delete(`https://jsonplaceholder.typicode.com/posts/${postId}`).pipe(
        delay(500),
        // dispatch another action in return
        map((response: AjaxResponse) => deletePostSuccess(postId))
      )
    )
  );
