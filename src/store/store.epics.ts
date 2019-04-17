import { merge, Observable } from "rxjs";
import { Action, ApplicationState, Epic } from "./store.types";
import * as epics from "./epics";

/**
 * All epics must be combined here.
 * In order to add epics just export them from epics folder
 */

const combineEpics: Epic = (
  actions$: Observable<Action>,
  state$: Observable<ApplicationState>
): Observable<Action> =>
  merge(
    // @ts-ignore
    ...Object.values(epics)
      .filter((epic: Epic) => typeof epic === "function")
      .map((epic: Epic) => epic(actions$, state$))
  );

export default combineEpics;
