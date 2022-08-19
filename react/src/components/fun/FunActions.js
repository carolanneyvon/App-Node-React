import { useLocation, useNavigate } from "react-router-dom";

const FunActions = (props) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const id = props.id;

  const show = () => {
    if (props.role === "Patron" || props.role === "Administrateur") {
      return (
        <>
          <button
            className="btn btn-warning me-2"
            onClick={() => navigate(`${pathname}/${id}/edit`)}
          >
            Modifier
          </button>
          <button className="btn btn-danger" onClick={props.onDelete}>
            Supprimer
          </button>
        </>
      );
    }
    if (props.role === "Commercial") {
      return (
        <>
          <button
            className="btn btn-warning me-2"
            onClick={() => navigate(`${pathname}/${id}/edit`)}
          >
            Modifier
          </button>
        </>
      );
    }
  };

  return (
    <>
      <button
        className="btn btn-success me-2"
        onClick={() => navigate(`${pathname}/${id}/view`)}
      >
        Visualiser
      </button>
      {show()}
    </>
  );
};

export default FunActions;
