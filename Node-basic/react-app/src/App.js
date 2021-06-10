import React, { useState } from "react";
import "./App.css";
import Button from "./components/Button";
import Card from "./components/Card";
import Counter from "./components/Counter";
import CounterFunctional from "./components/CounterFunctional";

const mylist = [
  {
    name: "Nirajan",
    deg: "Bachelor",
  },
  {
    name: "Next Person",
    deg: "Master",
  },
  {
    name: "Hesin",
    deg: "Phd.",
  },
];

function App() {
  const [hide, seth] = useState(false);
  const onclick = () => seth(!hide);
  return (
    <div className="container">
      {/* <Header title={1} /> */}
      <div>
        {mylist.map((emp) => {
          return <Card key={emp.name} {...emp} />;
        })}
        <Counter />
        <Button onclick={onclick} label="Show/Hide Fn" />
        {!hide && <CounterFunctional />}
      </div>
    </div>
  );
}

// class App extends React.Component {
//   render() {
//     return (
//       <div style={{ color: "red", borderBottom: "20px solid red" }}>
//         <Header className="App-header" />
//         Hello
//       </div>
//     );
//   }
// }
export default App;
