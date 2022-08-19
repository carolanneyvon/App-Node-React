import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import {useEffect, useState} from 'react';

const VehicleCreate = () => {

const [vehicle_mod, setVehicleModel] = useState();
const [vehicle_man, setVehicleMan] = useState();
const [vehicle_type, setVehicleType] = useState();
const [vehicle_desc, setVehicleDesc] = useState();
const [vehicle_pric, setVehiclePrice] = useState();
  
  const api_path = "/vehicles";
  const navigate = useNavigate();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`http://localhost:3001/api${api_path}`,
    {
      model: vehicle_mod,
      manufacturer: vehicle_man,
      type: vehicle_type,
      description: vehicle_desc,
      price: vehicle_pric,
    }).then(() => {
      console.log('POST GOOD');
    }).catch(() => {console.log('POST FAIL');});
    navigate(api_path, {replace: true})
  };
  
return (
<div className="content">
  <div className="container">
  <h1 className="mb-5">Création d'un véhicule</h1>

    <form className="d-flex row gap-3" onSubmit={handleSubmit}>
      <table
      className="table table-responsive table-striped table-bordered">
        <thead>
        <tr>
        <th scope="col" colSpan="2">Détails</th>
        </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row" className="col-4">Modèle
            </th>
            <td>
              <input className="text-center" type="text"
                required 
                onChange={(e) => setVehicleModel(
                e.target.value)}>
              </input>
            </td>
          </tr>
          <tr>
            <th scope="row" className="col-4">Marque
            </th>
            <td>
              <input className="text-center" type="text"
                required 
                onChange={(e) => setVehicleMan(
                e.target.value)}>
              </input>
            </td>
          </tr>
          <tr>
            <th scope="row" className="col-4">Type
            </th>
            <td>
              <input className="text-center" type="text"
                required 
                onChange={(e) => setVehicleType(
                e.target.value)}>
              </input>
            </td>
          </tr>
          <tr>
            <th scope="row" className="col-4">Description
            </th>
            <td>
              <input className="text-center" type="text"
                required 
                onChange={(e) => setVehicleDesc(
                e.target.value)}>
              </input>
            </td>
          </tr>
            <tr>
              <th scope="row" className="col-4">Prix
              </th>
              <td>
              <input className="text-center" type="number"
                required 
                onChange={(e) => setVehiclePrice(
                e.target.value)}>
              </input>
              </td>
            </tr>
        </tbody>
      </table>
    <button className="btn btn-success"
    type="submit">Créer
    </button>
    <button className="btn btn-danger"
    onClick={() => {
    navigate(api_path, {replace: true});
    }}>Annuler
    </button>
    </form>
  </div>
</div>
);
};
              
export default VehicleCreate;
