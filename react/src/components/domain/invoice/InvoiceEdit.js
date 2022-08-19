import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const InvoiceEdit = () => {
  const [invoice, setInvoice] = useState({});
  const [invoice_id, setInvoiceId] = useState();
  const [order_id, setOrderId] = useState();
  const [orders_list, setOrdersList] = useState({});

  const { id } = useParams(); // Unpacking and retrieve id
  const api_path = `/invoices/${id}`;
  const order_path = "/orders";
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(orders_list);
    const invoice_copy = { ...invoice };
    invoice_copy.id = invoice_id;
    invoice_copy.orderId = order_id;
    console.log(invoice_copy);
    setInvoice(invoice_copy);
    axios
      .put(`http://localhost:3001/api${api_path}`, {
        id: invoice_id,
        orderId: order_id,
      })
      .then(() => {
        console.log("PUT GOOD");
      })
      .catch(() => {
        console.log("PUT FAIL");
      });
    navigate("/invoices", { replace: true });
  };

  console.log("InvoiceEdit: id: ", id);

  // same as componentDidMount() only => the key is []
  useEffect(() => {
    axios
      .get(api_path)
      .then((response) => {
        console.log("InvoiceEdit: data api : ", response.data);
        setInvoice(response.data);
        setInvoiceId(response.data.id);
        setOrderId(response.data.orderId);
      })
      .catch((error) => console.log(error));
    axios
      .get(order_path)
      .then((response) => {
        console.log("Orders: ", response.data);
        setOrdersList(response.data);
        console.log(orders_list);
      })
      .catch((error) => console.log(error));
  }, []);

  // check id type as int
  if (isNaN(id) || (parseFloat(id) | 0) !== parseFloat(id)) {
    // todo: do it better
    return <h1>InvoiceEdit Error: param 'id' is not an integer</h1>;
  }

  return (
    <div className="content">
      <div className="container">
        <h1 className="mb-5">Modification de la facture</h1>

        <form className="d-flex row gap-3" onSubmit={handleSubmit}>
          <table className="table table-responsive table-striped table-bordered">
            <thead>
              <tr>
                <th scope="col" colSpan="2">
                  Détails
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row" className="col-4">
                  N° de la facture
                </th>
                <td>
                  <input
                    className="text-center"
                    type="number"
                    required
                    min="0"
                    value={invoice_id || ""}
                    onChange={(e) => setInvoiceId(e.target.value)}
                  ></input>
                </td>
              </tr>
              <tr>
                <th scope="row">N° de la commande</th>
                <td>
                  <select
                    value={order_id}
                    onChange={(e) => {
                      setOrderId(e.target.value);
                    }}
                  >
                    {Object.keys(orders_list).map((key) => {
                      return <option key={key}>{orders_list[key].id}</option>;
                    })}
                  </select>
                </td>
              </tr>
            </tbody>
          </table>
          <button className="btn btn-success" type="submit">
            Sauvegarder
          </button>
          <button
            className="btn btn-danger"
            onClick={() => {
              navigate("/invoices", { replace: true });
            }}
          >
            Annuler
          </button>
        </form>
      </div>
    </div>
  );
};

export default InvoiceEdit;
