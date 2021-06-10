import React from "react";
import "./App.css";
import Header from "./components/Header";
function App() {
  const name = "Bard";
  return (
    <div className="container">
      <Header title={1} />
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
