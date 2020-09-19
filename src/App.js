import React from "react";
import "./App.css";
import DropDown from './DropDown';

function App() {
  let handler = React.useCallback(code => {
    console.log(code);
  }, []);
  return (
    <div className="App">
      <DropDown onSelect={handler} />
    </div>
  );
}

export default App;
