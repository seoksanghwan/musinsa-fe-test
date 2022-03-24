import React from "react";
import { observer, inject } from "mobx-react";

function Counter(props) {
  return (
    <div>
      <h1>{props.store.CountStore.number}</h1>
      <button onClick={props.store.CountStore.increase}>+1</button>
      <button onClick={props.store.CountStore.decrease}>-1</button>
    </div>
  );
}

export default inject("store")(observer(Counter));
// export default observer(inject("counter")(Counter)); // not works
