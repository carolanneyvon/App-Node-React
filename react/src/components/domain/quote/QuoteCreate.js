import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const QuoteCreate = () => {
  const [quote, setQuote] = useState({});
  const [quote_status, setQuoteStatus] = useState("");
  const [quote_creator, setQuoteCreator] = useState("");
  const [quote_customer, setQuoteCustomer] = useState("");
  const [quote_vehicle, setQuoteVehicle] = useState("");
  const [creators_list, setCreatorsList] = useState({});
  const [customers_list, setCustomersList] = useState({});
  const [vehicles_list, setVehicleList] = useState({});
  const status_list = ["En attente", "Accepté", "Refusé"];


  const api_path = `/quotes`;
  const creators_path = "/users";
  const customer_path = '/customers';
  const vehicles_path = "/vehicles";
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const quote_copy = { ...quote };
    quote_copy.status = quote_status;
    quote_copy.creatorId = quote_creator.id;
    quote_copy.customerId = quote_customer.id;
    quote_copy.vehicleId = quote_vehicle.id;
    console.log(quote_copy);
    setQuote(quote_copy);
    axios
      .post(`http://localhost:3001/api${api_path}`, {
        firstname: quote_status,
        creatorId: quote_creator.id,
        customerId: quote_customer.id,
        vehicleId: quote_vehicle.id
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
    axios.get(customer_path).then((response) => {
        console.log('Customers: ', response.data);
        setCustomersList(response.data);
        console.log(customers_list);
    }).catch((error) => console.log(error));
    axios
    .get(creators_path)
    .then((response) => {
      console.log("Creators: ", response.data);
      setCreatorsList(response.data);
      console.log(creators_list);
    })
    .catch((error) => console.log(error));
    axios
    .get(vehicles_path)
    .then((response) => {
      console.log("Vehicule: ", response.data);
      setVehicleList(response.data);
      console.log(vehicles_list);
    })
    .catch((error) => console.log(error));
  }, []);

  return (
    <div className="content">
      <div className="container">
        <h1 className="mb-5">Création d'un devis</h1>

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
                <th scope="row">Status</th>
                <td>
                <select
                    className="text-center"
                    value={quote_status}
                    onChange={(e) => {
                    setQuoteStatus(e.target.value);
                    }}
                >
                    <option>Sélectionner un status</option>
                    {status_list.map((key) => {
                    return (
                        <option key={key} value={key}>
                        {key}
                        </option>
                    );
                    })}
                </select>
                </td>
              </tr>
              <tr>
                <th scope="row">Client</th>
                <td>
                <select
                    className="text-center"
                    value={quote_customer.id || ""}
                    onChange={(e) => {
                    setQuoteCustomer(customers_list[e.target.selectedIndex -1]);
                    }}
                >
                    <option>Sélectionner un client</option>
                    {Object.keys(customers_list).map((key) => {
                    return (
                        <option key={key} value={customers_list[key].id}>
                        {`${customers_list[key].firstname} ${customers_list[key].lastname}`}
                        </option>
                    );
                    })}
                </select>
                </td>
              </tr>
              <tr>
                <th scope="row">Créateur</th>
                <td>
                <select
                    className="text-center"
                    value={quote_creator.id || ""}
                    onChange={(e) => {
                    setQuoteCreator(creators_list[e.target.selectedIndex -1]);
                    }}
                >
                    <option>Sélectionner le commercial</option>
                    {Object.keys(creators_list).map((key) => {
                    return (
                        <option key={key} value={creators_list[key].id}>
                        {`${creators_list[key].firstname} ${creators_list[key].lastname}`}
                        </option>
                    );
                    })}
                </select>
                </td>
              </tr>
              <tr>
                <th scope="row">Véhicules</th>
                <td>
                <select
                    className="text-center"
                    value={quote_vehicle.id || ""}
                    onChange={(e) => {
                        setQuoteVehicle(vehicles_list[e.target.selectedIndex -1]);
                    }}
                >
                    <option>Sélectionner un véhicule</option>
                    {Object.keys(vehicles_list).map((key) => {
                    return (
                        <option key={key} value={vehicles_list[key].id}>
                        {`${vehicles_list[key].manufacturer} ${vehicles_list[key].model}`}
                        </option>
                    );
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

export default QuoteCreate;
