import { Subject } from "rxjs";
import { scan, startWith } from "rxjs/operators";
import { Action, Reducer, Store, Epic } from "./store.types";
/**
 * This function creates the store for the application
 * @param reducer
 * @param epics
 */
const createStore = (reducer: Reducer, epics: Epic): Store => {
  // Create the Action Subject
  const action$ = new Subject<Action>();
  // Each dispatched action will be reduced by the reducer.
  const state$ = action$.pipe(
    startWith({ type: "@@INIT" }),
    scan(reducer, undefined) // <-- The magic happens here
  );

  // Each epic will get the stream of actions and will dispatch other actions in return
  // The emitted actions will be immediately dispatched through the normal store.dispatch()
  epics(action$, state$).subscribe(action$);

  return {
    dispatch: action$.next.bind(action$),
    subscribe: state$.subscribe.bind(state$)
  };
};

export default createStore;
