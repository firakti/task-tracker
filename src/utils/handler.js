import { useState } from "react";

// const createHandler = (state, setState) => {

//   const pushState = (update) => {
//     setState((s) => ({ ...s, ...update }));
//   };

//   const handler = (action, payload) => {
//     //console.log("handler start");
//     if (action) {
//       action({ state, payload, pushState });
//     }
//     //console.log("handler end");
//   };

//   return handler;
// };

// const useStateHandler = (defaultValue) => {
//   const [state, setState] = useState(defaultValue);

//   const handler = createHandler(null, setState);

//   return [state, handler];
// };

const useStateWithPush = (defaultValue) => {
  const [state, setState] = useState(defaultValue);

  const pushState = (update) => {
    setState((s) => ({ ...s, ...update }));
  };


  return [state, pushState];
};
export {
  // createHandler,
  // useStateHandler,
  useStateWithPush
};
