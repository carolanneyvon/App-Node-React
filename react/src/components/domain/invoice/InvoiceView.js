import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const InvoiceView = () => {
  const [invoice, setInvoice] = useState([]);
  const [order, setOrder] = useState({});
  const [quote, setQuote] = useState({});
  const [creator, setCreator] = useState({});
  const [customer, setCustomer] = useState({});
  const [vehicle, setVehicle] = useState({});
  const { id } = useParams(); // Unpacking and retrieve id
  const api_path = `/invoices/${id}`;

  const date_created_invoice = new Date(invoice.createdAt);
  const date_created_order = new Date(order.createdAt);

  console.log("InvoiceView: id: ", id);

  // same as componentDidMount() only => the key is []
  useEffect(() => {
    axios
      .get(api_path)
      .then((response) => {
        console.log("InvoiceView: data api : ", response.data);
        setInvoice(response.data);
        setOrder(response.data.order);
        setQuote(response.data.order.quote);
        setCreator(response.data.order.quote.creator);
        setCustomer(response.data.order.quote.customer);
        setVehicle(response.data.order.quote.vehicle);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="content">
      <div className="container">
        <h1 className="mb-5">Informations sur la facture</h1>

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
                N° de facture
              </th>
              <td>{invoice.id}</td>
            </tr>
            <tr>
              <th scope="row">Date de la facture</th>
              <td>{date_created_invoice.toLocaleDateString()}</td>
            </tr>
          </tbody>
        </table>

        <table className="table table-responsive table-striped table-bordered">
          <thead>
            <tr>
              <th scope="col" colSpan="2">
                Informations sur la commande
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
              <td>{date_created_order.toLocaleDateString()}</td>
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

export default InvoiceView;
