import React from "react";
import "./DropDown.css";

const DATA_URL =
  "https://gist.githubusercontent.com/tdreyno/4278655/raw/7b0762c09b519f40397e4c3e100b097d861f5588/airports.json";

const useData = () => {
  const [loading, setLoadingState] = React.useState(false);
  const [data, setDataState] = React.useState([]);
  React.useEffect(() => {
    (async () => {
      setLoadingState(true);
      let data = await fetch(DATA_URL).then(response => response.json());
      setLoadingState(false);
      setDataState(data);
    })();
  }, []);
  return [loading, data];
};

function DropDownItem({ name, code, city, country, onSelect }) {
  return (
    <div onClick={() => onSelect && onSelect(code)} className="DropDownItem">
      <div className="Title">
        <div className="Name">{name}</div>
        <div className="City">{`${city}/${country}`}</div>
      </div>
      <div className="Code">{code}</div>
    </div>
  );
}
function DropDownContent({ onSelect }) {
  const [loading, data] = useData();
  return (
    <div className="DropDownContent">
      {loading && <div className="Loader">loading...</div>}
      {!loading &&
        data &&
        data.map(d => <DropDownItem onSelect={onSelect} key={d.code} {...d} />)}
    </div>
  );
}

export default function DropDown({ onSelect }) {
  const [open, setOpenState] = React.useState(false);
  return (
    <button className="DropDown" onClick={() => setOpenState(!open)}>
      Airport Picker {open ? "▲" : "▼"}
      {open && <DropDownContent onSelect={onSelect} />}
    </button>
  );
}
