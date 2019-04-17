import { Observable, NextObserver, Subscription } from "rxjs";
import { ActionType } from "./store.actions";

/**
 * The application state interface.
 * Here we declare what data will be stored in our application state.
 */
export interface ApplicationState {
  readonly posts: { [postId: string]: any };
  readonly deletingPosts: { [postId: string]: boolean };
}

/**
 * Reducers specify how the application's state changes in response to actions.
 * (prevState, action) => newState
 */
export type Reducer = (
  previousState: ApplicationState,
  action: Action
) => ApplicationState;

/**
 * Epic is a function which takes an Observable of actions and returns an Observable of actions.
 * Actions in, actions out, simple as that.
 */
export type Epic = (
  action$: Observable<Action>,
  state$?: Observable<ApplicationState>
) => Observable<Action>;

/**
 * ActionCreator is a function that can take any number of arguments and must return an Action
 */
export type ActionCreator<T = any> = (
  arg1?: any,
  arg2?: any,
  arg3?: any,
  arg4?: any,
  arg5?: any,
  ...rest: any[]
) => Action<T>;

/**
 * Action interface
 */
export interface Action<T = any> {
  type: ActionType;
  payload?: T;
}

/**
 * Dispatch action (aka Subject.next)
 */
export type Dispatch = (action: Action) => void;

/**
 * Typical RxJS Subscriber
 */
export type StoreSubscriber = (
  observer: NextObserver<ApplicationState>
) => Subscription;

/**
 * Store type - this is the type you will received from createStore function.
 * dispatch - a function that let you dispatch actions
 * subscribe - typical RxJS subscribe
 */
export interface Store {
  dispatch: Dispatch;
  subscribe: StoreSubscriber;
}
