import FunActions from "../../fun/FunActions";
import axios from "axios";

const CustomerRow = (props) => {
  const id = props.customer.id;
  const api_path = "/customers";

  const onDelete = () => {
    axios
      .delete(`${api_path}/${id}`)
      .then(() => {
        console.log("DELETE GOOD");
      })
      .catch(() => {
        console.log("DELETE FAILED");
      });
    const customers_copy = [...props.customers];
    customers_copy.splice(props.index, 1);
    props.setCustomers(customers_copy);
    console.log(customers_copy);
  };

  return (
    <tr>
      <td>{props.customer.id}</td>
      <td>{props.customer.lastname}</td>
      <td>{props.customer.firstname}</td>
      <td>{props.customer.city}</td>
      <td>{props.customer.mobile || props.customer.phone}</td>
      <td>{props.customer.creator.firstname} {props.customer.creator.lastname}</td>
      {/* données créateur */}
      <td>
        <FunActions id={id} onDelete={onDelete} role={props.role} />
      </td>
    </tr>
  );
};

export default CustomerRow;
