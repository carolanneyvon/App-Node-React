import FunActions from "../../fun/FunActions";
import axios from "axios";

const QuoteRow = (props) => {
  const create_date = new Date(props.quote.createdAt);
  const id = props.quote.id;
  const api_path = `/quotes`;

  const onDelete = () => {
    axios
      .delete(`${api_path}/${id}`)
      .then(() => {
        console.log("DELETE GOOD");
      })
      .catch(() => {
        console.log("DELETE FAILED");
      });
    const quotes_copy = [...props.quotes];
    quotes_copy.splice(props.index, 1);
    props.setQuotes(quotes_copy);
    console.log(quotes_copy);
  };

  return (
    <tr>
      <td>{props.quote.number}</td>
      <td>
        {props.quote.customer.firstname} {props.quote.customer.lastname}{" "}
      </td>
      <td>
        {props.quote.vehicle.model} {props.quote.vehicle.manufacturer}
      </td>
      <td>{create_date.toLocaleDateString()}</td>
      <td>{props.quote.status}</td>
      <td>
        <FunActions id={id} onDelete={onDelete} role={props.role} />
      </td>
    </tr>
  );
};

export default QuoteRow;
