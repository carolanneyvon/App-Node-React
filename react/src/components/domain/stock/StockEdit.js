import { useApiEffect } from "../../hook/useApi";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const StockEdit = () => {
  const navigate = useNavigate();

  const { id } = useParams(); // Unpacking and retrieve id
  const api_path = `/stocks/${id}`;
  // Custom hook useApi
  const [stock, setStock /*, pending, error*/] = useApiEffect(api_path);
  const [vehicle, setVehicle] = useState({});
  const [stock_qty, setStockQuantity] = useState(0);

  // same as componentDidMount() only => the key is []
  useEffect(() => {
    if (stock.vehicle) {
      setVehicle(stock.vehicle);
      setStockQuantity(stock.quantity);
    }
  }, [stock]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const stock_copy = { ...stock };
    stock_copy.quantity = stock_qty;
    // stock_copy.id = vehicle_id;
    console.log(stock_copy);
    setStock(stock_copy);
    axios
      .put(`http://localhost:3001/api${api_path}`, {
        quantity: stock_qty,
      })
      .then(() => {
        console.log("PUT GOOD");
      })
      .catch(() => {
        console.log("PUT FAIL");
      });
    navigate(-1, { replace: true });
  };

  return (
    <div className="content">
      <div className="container">
        <h1 className="mb-5">Modification du véhicule</h1>

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
                  Modèle
                </th>
                <td>{vehicle.model || ""}</td>
              </tr>
              <tr>
                <th scope="row" className="col-4">
                  Marque
                </th>
                <td>{vehicle.manufacturer || ""}</td>
              </tr>
              <tr>
                <th scope="row" className="col-4">
                  Quantité
                </th>
                <td>
                  <input
                    className="text-center"
                    type="number"
                    value={stock.quantity || ""}
                    onChange={(e) => setStockQuantity(e.target.value)}
                  ></input>
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
              navigate(api_path - 1, { replace: true });
            }}
          >
            Annuler
          </button>
        </form>
      </div>
    </div>
  );
};

export default StockEdit;
