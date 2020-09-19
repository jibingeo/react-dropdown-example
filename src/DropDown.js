import React from "react";
import "./DropDown.css";

const DATA_URL =
  "https://gist.githubusercontent.com/tdreyno/4278655/raw/7b0762c09b519f40397e4c3e100b097d861f5588/airports.json";
let DEAD_SIMPLE_CACHE;

const useData = () => {
  const [loading, setLoadingState] = React.useState(false);
  const [data, setDataState] = React.useState(DEAD_SIMPLE_CACHE || []);
  React.useEffect(() => {
    if (DEAD_SIMPLE_CACHE) {
      return;
    }
    (async () => {
      setLoadingState(true);
      let data = await fetch(DATA_URL).then(response => response.json());
      DEAD_SIMPLE_CACHE = data;
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

function useOutClicker(onClose) {
  const ref = React.useRef(null);
  const handler = React.useCallback(
    e => {
      if (ref.current && !ref.current.contains(e.target)) {
        onClose && onClose();
      }
    },
    [onClose]
  );
  React.useEffect(() => {
    document.addEventListener("click", handler, true);
    return () => {
      document.removeEventListener("click", handler, true);
    };
  }, [handler]);
  return ref;
}

function DropDownContent({ onSelect, onClose }) {
  const [loading, data] = useData();
  const ref = useOutClicker(onClose);
  const selectHandler = React.useCallback(
    code => {
      onSelect && onSelect(code);
      onClose && onClose();
    },
    [onSelect, onClose]
  );
  return (
    <div ref={ref} className="DropDownContent">
      {loading && <div className="Loader">loading...</div>}
      {!loading &&
        data &&
        data.map(d => (
          <DropDownItem onSelect={selectHandler} key={d.code} {...d} />
        ))}
    </div>
  );
}

export default function DropDown({ onSelect }) {
  const [open, setOpenState] = React.useState(false);
  return (
    <div className="DropDownWrap">
      <button className="DropDown" onClick={() => setOpenState(!open)}>
        Airport Picker {open ? "▲" : "▼"}
      </button>
      {open && (
        <DropDownContent
          onClose={() => setOpenState(false)}
          onSelect={onSelect}
        />
      )}
    </div>
  );
}
