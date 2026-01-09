const redux = require("redux");

const INITIAL_VALUE = {
  counter: 0,
};

const reducer = (store = INITIAL_VALUE, action) => {
  if (action.type === "INCREMENT") {
    return { counter: store.counter + 1 };
  } else if (action.type === "DECREMENT") {
    return { counter: store.counter - 1 };
  } else if (action.type === "ADDITION") {
    return { counter: store.counter + action.payload.number };
  }
  return store;
};

const store = redux.createStore(reducer);

// subscriber function
const subscriber = () => {
  const state = store.getState();
  console.log(state);
};

// ✅ correct usage
store.subscribe(subscriber);

store.dispatch({ type: "INCREMENT" });
store.dispatch({ type: "DECREMENT" });
store.dispatch({ type: "ADDITION", payload: { number: 7 } });
store.dispatch({ type: "INCREMENT" });
