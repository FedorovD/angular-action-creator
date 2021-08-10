import { createAction, props } from '@ngrx/store';
import { ErrorState, ActionCreatorProps } from './interfaces';

export class ActionCreator {
  private prefix: string;
  constructor(prefix: string) {
    this.prefix = `[${prefix}]`;
  }

  createAction<T extends object>(type: string) {
    return createAction(`${this.prefix} ${type}`, props<T>() as ActionCreatorProps<any>);
  }

  createAsyncAction<Q extends object, W extends object, E extends object = ErrorState>(type: string) {
    return {
      started: createAction(`${this.prefix} ${type}_STARTED`, props<Q>() as ActionCreatorProps<any>),
      success: createAction(`${this.prefix} ${type}_SUCCESS`, props<W>() as ActionCreatorProps<any>),
      failed: createAction(`${this.prefix} ${type}_FAILED`, props<E>() as ActionCreatorProps<any>),
    }
  }
}
