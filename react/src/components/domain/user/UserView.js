import { useParams } from "react-router-dom";
import { useApiEffect } from "../../hook/useApi";

const UserView = () => {
  const { id } = useParams(); // Unpacking and retrieve id
  console.log("UserView: id: ", id);

  // Custom hook useApi
  const [user /*, setUser, pending, error*/] = useApiEffect(`/users/${id}`);

  return (
    <div className="content">
      <div className="container">
        <h1 className="mb-5">Informations sur l'utilisateur</h1>

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
                Identifiant de l'utilisateur
              </th>
              <td>{user.id}</td>
            </tr>
            <tr>
              <th scope="row">Nom</th>
              <td>{user.lastname}</td>
            </tr>
            <tr>
              <th scope="row">Prénom</th>
              <td>{user.firstname}</td>
            </tr>
            <tr>
              <th scope="row">Rôle</th>
              <td>{user.role}</td>
            </tr>
            <tr>
              <th scope="row">Statut</th>
              <td>{user.active}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserView;
