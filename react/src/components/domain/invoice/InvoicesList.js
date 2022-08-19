import { useEffect, useState } from "react";
import axios from "axios";
import InvoiceRow from "./InvoiceRow";
import { useNavigate } from "react-router-dom";

const InvoicesList = (props) => {
  const [invoices, setInvoices] = useState([]);
  const api_path = "/invoices";
  const navigate = useNavigate();

  const show = () => {
    if (props.role === "Patron" || props.role === "Administrateur") {
      return (
        <>
          <th scope="col">
            <button
              className="btn btn-success me-2"
              onClick={() => navigate(`${api_path}/add`)}
            >
              Créer
            </button>
          </th>
        </>
      );
    }
  };

  // same as componentDidMount() only => the key is []
  useEffect(() => {
    axios
      .get(api_path)
      .then((response) => setInvoices(response.data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="content">
      <div className="container">
        <h2 className="mb-5">Factures</h2>
        <div className="table-responsive">
          <table className="table table-striped custom-table">
            <thead>
              <tr>
                <th scope="col">N° de facture</th>
                <th scope="col">Nom</th>
                <th scope="col">Prénom</th>
                <th scope="col">Date de création</th>
                <th scope="col">Order</th>
                {show()}
              </tr>
            </thead>
            <tbody>
              {invoices.map((invoice, index) => {
                return (
                  <InvoiceRow
                    key={index}
                    invoice={invoice}
                    index={index}
                    invoices={invoices}
                    setInvoices={setInvoices}
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

export default InvoicesList;
