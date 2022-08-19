import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const OrderCreate = () => {
  const [order, setOrder] = useState({});
  const [priority, setPriority] = useState();
  const [quote_id, setQuoteId] = useState();
  const [quotes_list, setQuotesList] = useState({});
  const priority_list = ["Très Urgent", "Urgent", "Normal", "Non prioritaire"];

  const api_path = "/orders";
  const quotes_path = "/quotes";
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(quotes_list);
    const order_copy = { ...order };
    order_copy.quoteId = quote_id;
    order_copy.priority = priority;
    console.log(order_copy);
    setOrder(order_copy);
    axios
      .post(`http://localhost:3001/api${api_path}`, {
        quoteId: quote_id,
        priority: priority,
      })
      .then(() => {
        console.log("POST GOOD");
      })
      .catch(() => {
        console.log("POST FAIL");
      });
    navigate("/orders", { replace: true });
  };

  // same as componentDidMount() only => the key is []
  useEffect(() => {
    axios
      .get(quotes_path)
      .then((response) => {
        console.log("Quotes: ", response.data);
        setQuotesList(response.data);
        console.log(quotes_list);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="content">
      <div className="container">
        <h1 className="mb-5">Création de la commande</h1>

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

export default OrderCreate;
