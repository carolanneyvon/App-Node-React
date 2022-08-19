import FunActions from "../../fun/FunActions";
import axios from "axios";

const InvoiceRow = (props) => {
  const date = new Date(props.invoice.createdAt);
  const id = props.invoice.id;
  const api_path = `/invoices`;

  const onDelete = () => {
    axios
      .delete(`${api_path}/${id}`)
      .then(() => {
        console.log("DELETE GOOD");
      })
      .catch(() => {
        console.log("DELETE FAILED");
      });
    const invoices_copy = [...props.invoices];
    invoices_copy.splice(props.index, 1);
    props.setInvoices(invoices_copy);
    console.log(invoices_copy);
  };

  return (
    <tr>
      <td>{props.invoice.number}</td>
      <td>{props.invoice.order.quote.customer.lastname}</td>
      <td>{props.invoice.order.quote.customer.firstname}</td>
      <td>{date.toLocaleDateString()}</td>
      <td>{props.invoice.sellingPrice} €</td>
      <td>
        <FunActions id={id} onDelete={onDelete} role={props.role} />
      </td>
    </tr>
  );
};

export default InvoiceRow;
