import React from "react";
import "./App.css";
import DropDown from './DropDown';

function App() {
  let handler = React.useCallback(code => {
    alert(code);
  }, []);
  return (
    <div className="App">
      <DropDown onSelect={handler} />
    </div>
  );
}

export default App;
