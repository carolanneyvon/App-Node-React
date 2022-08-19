import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const StockView = () => {
  const { id } = useParams(); // Unpacking and retrieve id
  const [stock, setStock] = useState([]);
  const [vehicle, setVehicle] = useState({});
  const api_path = `/stocks/${id}`;

  // same as componentDidMount() only => the key is []
  useEffect(() => {
    axios
      .get(api_path)
      .then((response) => {
        console.log("StockView: data api : ", response.data);
        setStock(response.data);
        setVehicle(response.data.vehicle);
      })
      .catch((error) => console.log(error));
  }, []);
  return (
    <div className="content">
      <div className="container">
        <h1 className="mb-5">Informations sur le véhicule en stock</h1>

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
                N° du véhicule
              </th>
              <td>{vehicle.id}</td>
            </tr>
            <tr>
              <th scope="row">Modèle</th>
              <td>{vehicle.model}</td>
            </tr>
            <tr>
              <th scope="row">Marque</th>
              <td>{vehicle.manufacturer}</td>
            </tr>
            <tr>
              <th scope="row">Quantité</th>
              <td>{stock.quantity}</td>
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
};;

export default StockView;
