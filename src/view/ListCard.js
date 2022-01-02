import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCards } from "../redux/slice";

const ListCard = () => {
  const dispatch = useDispatch();
  const cards = useSelector((state) => state.cards.cards);
  const cardStatus = useSelector((state) => state.cards.status);
  const error = useSelector((state) => state.cards.error);

  useEffect(() => {
    if (cardStatus === "idle") {
      dispatch(fetchCards());
    }
  }, [cardStatus, dispatch]);

  console.log(cards);

  return (
    <>
      <h1>ListCard</h1>
      <div style={{display: "flex", justifyContent: "space-between", width: '600px'}}>
        {cards.map((el) => (
          <div key={el.id}>
            <img src={el.thumbnailUrl} alt={`card ${el.id}`} />
            <h5> {el.title} </h5>
          </div>
        ))}
      </div>
    </>
  );
};

export default ListCard;
