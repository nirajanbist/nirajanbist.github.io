import React, { useState, useEffect } from "react";
import Button from "./Button";
function CounterFunctional() {
  const [counter, setCounter] = useState(0);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    console.log("Counter changed to", counter);
  }, [counter]);

  useEffect(() => {
    return () => console.log("Unmont Functional DOne");
  }, []);

  const handleIncrease = () => {
    setHidden(!hidden);
    setCounter(counter + 1);
  };

  const handleDecrease = () => {
    setCounter(counter - 1);
  };
  return (
    <div>
      <h1>Functional {counter}</h1>
      {!hidden && <div>Blink</div>}
      <Button onclick={handleIncrease} label="Increase" />
      <Button onclick={handleDecrease} label="Decrease" />
    </div>
  );
}

export default CounterFunctional;
