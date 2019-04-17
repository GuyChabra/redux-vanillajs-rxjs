import { ActionType } from "./store.actions";
import { Action } from "./store.types";
import { filter } from "rxjs/operators";
import { MonoTypeOperatorFunction } from "rxjs";

/**
 * Helper function used by Epics to filter required action types
 */
export const ofType = (
  ...types: ActionType[]
): MonoTypeOperatorFunction<Action> =>
  filter((action: Action) => types.indexOf(action.type) > -1);

/**
 * Function which helps to create actions without mistakes
 * @param type
 * @param payload
 */
export const action = <T>(type: ActionType, payload?: any): Action<T> => ({
  type,
  payload
});
