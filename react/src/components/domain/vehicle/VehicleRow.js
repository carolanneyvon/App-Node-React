import FunActions from "../../fun/FunActions";
import axios from "axios";

const VehicleRow = (props) => {
  const price = Math.round(props.vehicle.price);
  const id = props.vehicle.id;
  const api_path = `/vehicles`;

  const onDelete = () => {
    axios
      .delete(`${api_path}/${id}`)
      .then(() => {
        console.log("DELETE GOOD");
      })
      .catch(() => {
        console.log("DELETE FAILED");
      });
    const vehicles_copy = [...props.vehicles];
    vehicles_copy.splice(props.index, 1);
    props.setVehicles(vehicles_copy);
    console.log(vehicles_copy);
  };

  return (
    <tr>
      <td>{props.vehicle.id}</td>
      <td>{props.vehicle.model}</td>
      <td>{props.vehicle.manufacturer}</td>
      <td>{price} €</td>
      <td>
        <FunActions id={id} onDelete={onDelete} role={props.role} />
      </td>
    </tr>
  );
};

export default VehicleRow;
