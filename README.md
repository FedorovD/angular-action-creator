# angular-action-creator

Action creator for ngrx store.

## Usage

### Basic Action

```ts
import ActionCreator from '@aiscom-llc/angular-action-creator';

const actionCreator = new NgRxAction('Auth/API'); // Actions prefix

// Specify payload shape as generic type argument.
const somethingHappened = actionCreator.createAction<{foo: string}>('SOMETHING_HAPPENED');

// Get action creator type.
console.log(somethingHappened.type);  // [Auth/API] SOMETHING_HAPPENED

// Create action.
const action = somethingHappened({foo: 'bar'});
console.log(action);  // {type: '[Auth/API] SOMETHING_HAPPENED', foo: 'bar'}
```

### Async Action

Async Action Creators are objects with properties `started`, `success` and
`failed` whose values are action creators.

```ts
import ActionCreator from '@aiscom-llc/angular-action-creator';

const actionCreator = new NgRxAction('Auth/API'); // Actions type prefix

// specify parameters and result shapes as generic type arguments
const doSomething =
  actionCreator.createAsyncAction<{ foo: string },   // parameter type
                      { bar: number },               // success type
                      { code: number }               // error type (not required, ErrorState by default)
                     >('DO_SOMETHING');

console.log(doSomething.started({ foo: 'lol' }));
// {type: '[Auth/API] DO_SOMETHING_STARTED', foo: 'lol'}

console.log(doSomething.success({
  params: { foo: 'lol' },
  result: { bar: 42 },
}));
// {type: '[Auth/API] DO_SOMETHING_SUCCESS', 
//  params: {foo: 'lol'},
//  result: {bar: 42},
// }

console.log(doSomething.failed({
  params: { foo: 'lol' },
  error: { code: 42 },
}));
// {type: '[Auth/API] DO_SOMETHING_FAILED', 
//   params: {foo: 'lol'},
//   error: {code: 42},
// }
//----------------------------------------
//Using destructuring assignment syntax
const {
  started: doSomethingStarted,
  success: doSomethingSuccess,
  failed: doSomethingFailed,
} = doSomething;

doSomethingStarted({ foo: 'lol' });

doSomethingSuccess({
  params: { foo: 'lol' },
  result: { bar: 42 },
});

doSomethingFailed({
  params: { foo: 'lol' },
  error: { code: 42 },
});

```
