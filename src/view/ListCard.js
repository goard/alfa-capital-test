import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCards, selectCardIds } from "../redux/slice";
import ListCardItem from "./components/ListCardItem";
import TopBar from "./components/TopBar";
import Loader from "./components/Loader";

const ListCard = () => {
  const dispatch = useDispatch();
  const cards = useSelector(selectCardIds);
  const cardStatus = useSelector((state) => state.cards.status);
  const error = useSelector((state) => state.cards.error);

  useEffect(() => {
    if (cardStatus === "idle") {
      dispatch(fetchCards());
    }
  }, [cardStatus, dispatch]);

  const switchCaseStatus = (params) => {
    switch (params) {
      case "loading":
        return <Loader text="Loading..." />;
      case "failed":
        return <div>{error}</div>;
      case "succeeded":
        return (
          <div className="cards">
            {cards.map((el) => (
              <div key={el} className="card">
                <ListCardItem id={el} />
              </div>
            ))}
          </div>
        );
      default:
        break;
    }
  };

  return (
    <>
      <TopBar />
      <div className="container">
        <h1 className="text-center">ListCard</h1>
        {switchCaseStatus(cardStatus)}
      </div>
    </>
  );
};

export default ListCard;
