import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useApiEffect } from "../../hook/useApi";
import { ENUM } from "../../../config/enum.config.js";

const OrderEdit = () => {
  const { id } = useParams(); // Unpacking and retrieve id
  console.log("OrderEdit: id: ", id);

  const api_path = `/orders/${id}`;
  const [order, setOrder] = useApiEffect(api_path); // Custom Hook from context Api

  // State for related models data
  const [priority, setPriority] = useState();
  const [order_id, setOrderId] = useState();
  const [quote_id, setQuoteId] = useState();
  // componentDidUpdate equivalent
  useEffect(() => {
    if (order.id) setOrderId(order.id);
    if (order.quoteId) setQuoteId(order.quoteId);
    if (order.priority) setPriority(order.priority);
  }, [order]);

  const [quotes_list] = useApiEffect("/quotes"); // Custom Hook from context Api

  const priority_list = Object.values(ENUM.order.priority);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(quotes_list);
    const order_copy = { ...order };
    order_copy.id = order_id;
    order_copy.quoteId = quote_id;
    order_copy.priority = priority;
    console.log(order_copy);
    setOrder(order_copy);
    axios
      .put(`http://localhost:3001/api${api_path}`, {
        id: order_id,
        quoteId: quote_id,
        priority: priority,
      })
      .then(() => {
        console.log("PUT GOOD");
      })
      .catch(() => {
        console.log("PUT FAIL");
      });
    navigate("/orders", { replace: true });
  };

  // check id type as int
  if (isNaN(id) || (parseFloat(id) | 0) !== parseFloat(id)) {
    // todo: do it better
    return <h1>InvoiceEdit Error: param 'id' is not an integer</h1>;
  }

  return (
    <div className="content">
      <div className="container">
        <h1 className="mb-5">Modification de la commande</h1>

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
                  N° de la commande
                </th>
                <td>
                  <input
                    className="text-center"
                    type="number"
                    required
                    min="0"
                    value={order_id || ""}
                    onChange={(e) => setOrderId(e.target.value)}
                  ></input>
                </td>
              </tr>
              <tr>
                <th scope="row">Priorité</th>
                <td>
                  <select
                    className="text-center"
                    value={priority}
                    onChange={(e) => {
                      setPriority(e.target.value);
                    }}
                  >
                    {priority_list.map((key) => {
                      return <option key={key}>{key}</option>;
                    })}
                  </select>
                </td>
              </tr>
              <tr>
                <th scope="row">N° du devis</th>
                <td>
                  <select
                    value={quote_id}
                    onChange={(e) => {
                      setQuoteId(e.target.value);
                    }}
                  >
                    {Object.keys(quotes_list).map((key) => {
                      return <option key={key}>{quotes_list[key].id}</option>;
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
              navigate("/orders", { replace: true });
            }}
          >
            Annuler
          </button>
        </form>
      </div>
    </div>
  );
};;;;

export default OrderEdit;
