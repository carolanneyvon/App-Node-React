import { useApiEffect } from "../../hook/useApi";
import VehicleRow from "./VehicleRow";
import { useNavigate } from "react-router-dom";

const VehiclesList = (props) => {
  const api_path = "/vehicles";
  // Custom hook useApi
  const [vehicles, setVehicles /*, pending, error*/] = useApiEffect(api_path);
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

  return (
    <div className="content">
      <div className="container">
        <h2 className="mb-5">Véhicules</h2>
        <div className="table-responsive">
          <table className="table table-striped custom-table">
            <thead>
              <tr>
                <th scope="col">Véhicule</th>
                <th scope="col">Modèle</th>
                <th scope="col">Marque</th>
                <th scope="col">Prix</th>
                {show()}
              </tr>
            </thead>
            <tbody>
              {vehicles.map((vehicle, index) => {
                return (
                  <VehicleRow
                    key={index}
                    vehicle={vehicle}
                    index={index}
                    vehicles={vehicles}
                    setVehicles={setVehicles}
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

export default VehiclesList;
