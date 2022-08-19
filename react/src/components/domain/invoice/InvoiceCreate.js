import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const InvoiceCreate = () => {
  const [order_id, setOrderId] = useState();
  const [orders_list, setOrdersList] = useState({});

  const api_path = `/invoices`;
  const order_path = "/orders";
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`http://localhost:3001/api${api_path}`, {
        orderId: order_id,
      })
      .then(() => {
        console.log("POST GOOD");
      })
      .catch(() => {
        console.log("POST FAIL");
      });
    navigate(api_path, { replace: true });
  };

  // same as componentDidMount() only => the key is []
  useEffect(() => {
    axios
      .get(order_path)
      .then((response) => {
        console.log("Orders: ", response.data);
        setOrdersList(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="content">
      <div className="container">
        <h1 className="mb-5">Création d'une facture</h1>

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
            Créer
          </button>
          <button
            className="btn btn-danger"
            onClick={() => {
              navigate(api_path, { replace: true });
            }}
          >
            Annuler
          </button>
        </form>
      </div>
    </div>
  );
};

export default InvoiceCreate;
