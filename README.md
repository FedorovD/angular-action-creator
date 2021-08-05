# angular-action-creator

Action creator for rxjs store.
PACKAGE WAS COPPIED FROM [HERE](https://github.com/aikoven/typescript-fsa) AND WAS A BIT UPDATED TO WORK WITH ANGULAR.

```ts
interface Action<Payload> {
  type: string;
  payload: Payload;
  error?: boolean;
  meta?: Object;
}
```

## Usage

### Basic

```ts
import actionCreatorFactory from 'typescript-fsa';

const actionCreator = actionCreatorFactory();

// Specify payload shape as generic type argument.
const somethingHappened = actionCreator<{foo: string}>('SOMETHING_HAPPENED');

// Get action creator type.
console.log(somethingHappened.type);  // SOMETHING_HAPPENED

// Create action.
const action = somethingHappened({foo: 'bar'});
console.log(action);  // {type: 'SOMETHING_HAPPENED', {foo: 'bar'}}
```

### Async Action Creators

Async Action Creators are objects with properties `started`, `done` and
`failed` whose values are action creators. There is a number of [Companion Packages](#companion-packages) that help with binding Async Action Creators to async processes.

```ts
import actionCreatorFactory from 'typescript-fsa';

const actionCreator = actionCreatorFactory();

// specify parameters and result shapes as generic type arguments
const doSomething =
  actionCreator.async<{foo: string},   // parameter type
                      {bar: number},   // success type
                      {code: number}   // error type
                     >('DO_SOMETHING');

console.log(doSomething.started({foo: 'lol'}));
// {type: 'DO_SOMETHING_STARTED', {foo: 'lol'}}

console.log(doSomething.done({
  params: {foo: 'lol'},
  result: {bar: 42},
}));
// {type: 'DO_SOMETHING_DONE', {
//   params: {foo: 'lol'},
//   result: {bar: 42},
// }}

console.log(doSomething.failed({
  params: {foo: 'lol'},
  error: {code: 42},
}));
// {type: 'DO_SOMETHING_FAILED', {
//   params: {foo: 'lol'},
//   error: {code: 42},
// }, error: true}
```

### Actions With Type Prefix

You can specify a prefix that will be prepended to all action types. This is
useful to namespace library actions as well as for large projects where it's
convenient to keep actions near the component that dispatches them.

```ts
// MyComponent.actions.ts
import actionCreatorFactory from 'typescript-fsa';

const actionCreator = actionCreatorFactory('MyComponent');

const somethingHappened = actionCreator<{foo: string}>('SOMETHING_HAPPENED');

const action = somethingHappened({foo: 'bar'});
console.log(action);
// {type: 'MyComponent/SOMETHING_HAPPENED', {foo: 'bar'}}
```
