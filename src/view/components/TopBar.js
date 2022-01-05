import { useDispatch } from "react-redux";
import { cardsLikedFilter } from "../../redux/slice";

const TopBar = () => {
  const dispatch = useDispatch();

  const clickFilterHandler = () => {
    dispatch(cardsLikedFilter());
  };

  return (
    <header className="topbar">
      <div className="toolbar">
        <h1 style={{ margin: 0 }}>NavBar</h1>
        <button
          onMouseDown={clickFilterHandler}
          onMouseUp={clickFilterHandler}
          className="btn-filter"
        >
          Filter
        </button>
      </div>
    </header>
  );
};

export default TopBar;
