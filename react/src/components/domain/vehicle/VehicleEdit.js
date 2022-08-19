import axios from 'axios';
import {useNavigate, useParams} from 'react-router-dom';
import {useEffect, useState} from 'react';

const VehicleEdit = () => {
const [vehicle, setVehicle] = useState({});
const [vehicle_id, setVehicleId] = useState();
const [vehicle_mod, setVehicleModel] = useState();
const [vehicle_man, setVehicleMan] = useState();
const [vehicle_type, setVehicleType] = useState();
const [vehicle_desc, setVehicleDesc] = useState();
const [vehicle_pric, setVehiclePrice] = useState();


const {id} = useParams(); // Unpacking and retrieve id
const api_path = `/vehicles/${id}`;
const navigate = useNavigate();

const handleSubmit = (e) => {
  e.preventDefault();
  const vehicle_copy = {...vehicle};
  vehicle_copy.id = vehicle_id;
  console.log(vehicle_copy);
  setVehicle(vehicle_copy);
  axios.put(`http://localhost:3001/api${api_path}`,
  {
    id: vehicle_id,
    model: vehicle_mod,
    manufacturer: vehicle_man,
    type: vehicle_type,
    description: vehicle_desc,
    price: vehicle_pric,
  }).then(() => {
    console.log('PUT GOOD');
  }).catch(() => {console.log('PUT FAIL');});
    navigate(-1, {replace:true});
};

// same as componentDidMount() only => the key is []
useEffect(() => {
  axios.get(api_path).then((response) => {
    console.log('VehicleEdit: data api : ', response.data);
    setVehicle(response.data);
    setVehicleId(response.data.id);
    setVehicleModel(response.data.model);
    setVehicleMan(response.data.manufacturer);
    setVehicleType(response.data.type);
    setVehicleDesc(response.data.description);
    setVehiclePrice(response.data.price);
  }).catch((error) => console.log(error));
}, []);

return (
<div className="content">
  <div className="container">
  <h1 className="mb-5">Modification du véhicule</h1>

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
                value={vehicle_mod || ''}
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
                  value={vehicle_man || ''}
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
                value={vehicle_type || ''}
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
                value={vehicle_desc || ''}
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
                value={vehicle_pric || ''}
                onChange={(e) => setVehiclePrice(
                e.target.value)}>
              </input>
            </td>
          </tr>
        </tbody>
      </table>
    <button className="btn btn-success"
    type="submit">Sauvegarder
    </button>
    <button className="btn btn-danger"
    onClick={() => {
    navigate("/stocks", { replace: true });
    }}>Annuler
    </button>
    </form>
  </div>
</div>
);
};

export default VehicleEdit;
