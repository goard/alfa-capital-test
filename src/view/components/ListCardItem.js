import { useSelector, useDispatch } from "react-redux";
import { selectCardById, cardLiked, cardDelete } from "../../redux/slice";
import { likeIconBorder, likeIconFill } from "../../assets/icons";

const ListCardItem = ({ id }) => {
  const card = useSelector((state) => selectCardById(state, id));
  const dispatch = useDispatch();
  const { thumbnailUrl, title, liked } = card;

  const clickLikeHandler = () => {
    dispatch(cardLiked(card.id));
  };

  const clickDeleteHandler = () => {
    dispatch(cardDelete(card.id));
  };

  return (
    <div className="paper">
      <img src={thumbnailUrl} alt={`card ${id}`} />
      <div className="content">
        <h4 style={{ marginBottom: 0 }}>Title</h4>
        <p style={{ margin: "0 0" }}> {title} </p>
      </div>
      <div className="action">
        <div className="action-left">
          <button className="btn-like" onClick={clickLikeHandler}>
            {liked !== 0 ? likeIconFill : likeIconBorder}
          </button>
          <p>{liked}</p>
        </div>
        <button className="btn-delete" onClick={clickDeleteHandler}>
          <p className="btn-delete-text">Delete</p>
        </button>
      </div>
    </div>
  );
};

export default ListCardItem;
