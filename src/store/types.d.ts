import { StateType, ActionType } from 'typesafe-actions';
import { store } from './index';
import { rootReducer, rootAction } from './ducks';

declare module 'typesafe-actions' {
  export type Store = StateType<typeof store>;

  export type RootState = StateType<typeof rootReducer>;

  export type RootAction = ActionType<typeof rootAction>;

  interface Types {
    RootAction: RootAction;
  }
}
