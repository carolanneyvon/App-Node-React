import { useEffect, useState } from "react";
import axios from "axios";
import CustomerRow from "./CustomerRow";
import { useNavigate } from "react-router-dom";

const CustomersList = (props) => {
  const [customers, setCustomers] = useState([]);
  const api_path = "/customers";
  const navigate = useNavigate();

  // same as componentDidMount() only => the key is []
  useEffect(() => {
    axios
      .get(api_path)
      .then((response) => setCustomers(response.data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="content">
      <div className="container">
        <h2 className="mb-5">Clients</h2>
        <div className="table-responsive">
          <table className="table table-striped custom-table">
            <thead>
              <tr>
                <th scope="col">N° de client</th>
                <th scope="col">Nom</th>
                <th scope="col">Prénom</th>
                <th scope="col">Ville</th>
                <th scope="col">Contact</th>
                <th scope="col">Créateur</th>
                <th scope="col">
                  <button
                    className="btn btn-success me-2"
                    onClick={() => navigate(`${api_path}/add`)}
                  >
                    Créer
                  </button>
                </th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer, index) => {
                return (
                  <CustomerRow
                    key={index}
                    customer={customer}
                    index={index}
                    customers={customers}
                    setCustomers={setCustomers}
                    role={props.role}
                  />
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CustomersList;
