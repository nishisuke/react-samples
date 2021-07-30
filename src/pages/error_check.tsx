import { useState } from "react";

export const ErrorCheck = () => {
  const [renderError, setRenderError] = useState(false);
  if (renderError) throw new Error("render error desu");

  const rejectPromise = () => {
    Promise.reject(new Error("promise reject desu"));
  };
  const throwError = () => {
    throw new Error("throw done desu");
  };

  return (
    <>
      <button onClick={() => setRenderError(true)}>
        {renderError ? "to no error mode" : "to error mode"}
      </button>

      <button onClick={rejectPromise}>promise error</button>

      <button onClick={throwError}>error in event handler</button>
    </>
  );
};
