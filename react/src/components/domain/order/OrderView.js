import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useApiEffect } from "../../hook/useApi";

const OrderView = () => {
  const { id } = useParams(); // Unpacking and retrieve id

  // Custom hook useApi
  const [order /*, pending, error*/] = useApiEffect(`/orders/${id}`);

  // State for related models data
  const [quote, setQuote] = useState({});
  const [customer, setCustomer] = useState({});
  const [vehicle, setVehicle] = useState({});
  // componentDidUpdate equivalent
  useEffect(() => {
    if (order.quote) {
      setQuote(order.quote);
      if (order.quote.customer) setCustomer(order.quote.customer);
      if (order.quote.vehicle) setVehicle(order.quote.vehicle);
    }
  }, [order]);

  return (
    <div className="content">
      <div className="container">
        <h1 className="mb-5">Informations sur la commande</h1>

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
              <td>{order.id}</td>
            </tr>
            <tr>
              <th scope="row">Date de la commande</th>
              <td>{new Date(order.createdAt).toLocaleDateString()}</td>
            </tr>
            <tr>
              <th scope="row">N° du devis</th>
              <td>{quote.id}</td>
            </tr>
            <tr>
              <th scope="row">Priorité</th>
              <td>{order.priority}</td>
            </tr>
          </tbody>
        </table>

        <table className="table table-responsive table-striped table-bordered">
          <thead>
            <tr>
              <th scope="row" colSpan="2">
                Informations Client
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row" className="col-4">
                Nom et Prénom
              </th>
              <td>
                {customer.lastname} {customer.firstname}
              </td>
            </tr>
            <tr>
              <th scope="row">Adresse</th>
              <td>
                {customer.address}, {customer.zip} {customer.city}
              </td>
            </tr>
            <tr>
              <th scope="row">Téléphone</th>
              <td>{customer.mobile || customer.phone}</td>
            </tr>
          </tbody>
        </table>

        <table className="table table-responsive table-striped table-bordered">
          <thead>
            <tr>
              <th scope="row" colSpan="2">
                Informations Véhicule
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row" className="col-4">
                Modèle
              </th>
              <td>{vehicle.model}</td>
            </tr>
            <tr>
              <th scope="row">Marque</th>
              <td>{vehicle.manufacturer}</td>
            </tr>
            <tr>
              <th scope="row">Type</th>
              <td>{vehicle.type}</td>
            </tr>
            <tr>
              <th scope="row">Description</th>
              <td>{vehicle.description}</td>
            </tr>
            <tr>
              <th scope="row">Prix</th>
              <td>{vehicle.price} €</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderView;
