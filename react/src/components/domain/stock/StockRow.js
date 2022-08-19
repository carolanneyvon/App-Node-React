import FunActions from "../../fun/FunActions";
import axios from "axios";

const StockRow = (props) => {
  const id = props.stock.id;
  const vehicle = props.stock.vehicle;
  const api_path = `/stocks`;

  const onDelete = () => {
    axios
      .delete(`${api_path}/${id}`)
      .then(() => {
        console.log("DELETE GOOD");
      })
      .catch(() => {
        console.log("DELETE FAILED");
      });
    const stoks_copy = [...props.stoks];
    stoks_copy.splice(props.index, 1);
    props.setStocks(stoks_copy);
    console.log(stoks_copy);
  };

  return (
    <tr>
      <td>{vehicle.id}</td>
      <td>{vehicle.model}</td>
      <td>{vehicle.manufacturer}</td>
      <td>{props.stock.quantity}</td>
      <td>
        <FunActions id={id} onDelete={onDelete} role={props.role} />
      </td>
    </tr>
  );
};

export default StockRow;
