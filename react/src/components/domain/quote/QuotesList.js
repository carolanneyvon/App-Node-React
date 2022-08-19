import QuoteRow from "./QuoteRow";
import { useNavigate } from "react-router-dom";
import { useApiEffect } from "../../hook/useApi";

const QuotesList = (props) => {
  const api_path = "/quotes";
  const navigate = useNavigate();
  // Custom hook api.useApi
  const [quotes, setQuotes /*, pending, error*/] = useApiEffect(api_path);

  return (
    <div className="content">
      <div className="container">
        <h2 className="mb-5">Devis</h2>
        <div className="table-responsive">
          <table className="table table-striped custom-table">
            <thead>
              <tr>
                <th scope="col">N° de devis</th>
                <th scope="col">Client</th>
                <th scope="col">Véhicule</th>
                <th scope="col">Date du devis</th>
                <th scope="col">Status</th>
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
              {quotes.map((quote, index) => {
                return (
                  <QuoteRow
                    key={index}
                    index={index}
                    quote={quote}
                    quotes={quotes}
                    setQuotes={setQuotes}
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

export default QuotesList;
