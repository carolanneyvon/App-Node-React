import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useApiEffect } from "../../hook/useApi";

const QuoteView = () => {
  const { id } = useParams(); // Unpacking and retrieve id
  console.log("QuoteView: id: ", id);

  // Custom hook useApi
  const [quote /*, setQuote, pending, error*/] = useApiEffect(`/quotes/${id}`);

  // State for related models data
  const [creator, setCreator] = useState({});
  const [customer, setCustomer] = useState({});
  const [vehicle, setVehicle] = useState({});
  // componentDidUpdate equivalent
  useEffect(() => {
    if (quote.creator) setCreator(quote.creator);
    if (quote.customer) setCustomer(quote.customer);
    if (quote.vehicle) setVehicle(quote.vehicle);
  }, [quote]);

  const date_created_quote = new Date(quote.createdAt);
  const date_updated_quote = new Date(quote.updatedAt);

  return (
    <div className="content">
      <div className="container">
        <h1 className="mb-5">Informations sur le devis</h1>

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
                N° du devis
              </th>
              <td>{quote.number}</td>
            </tr>
            <tr>
              <th scope="row">Date du devis</th>
              <td>{date_created_quote.toLocaleDateString()}</td>
            </tr>
            <tr>
              <th scope="row">Date de clôture du devis</th>
              <td>{date_updated_quote.toLocaleDateString()}</td>
            </tr>
            <tr>
              <th scope="row">Statut</th>
              <td>{quote.status}</td>
            </tr>
            <tr>
              <th scope="row">Créateur du devis</th>
              <td>
                {creator.lastname} {creator.firstname}
              </td>
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
              <th scope="row">Prix</th>
              <td>{vehicle.price} €</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default QuoteView;
