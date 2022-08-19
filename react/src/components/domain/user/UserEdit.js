import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const OrderEdit = () => {
  const [user, setUser] = useState({});
  const [user_id, setUserId] = useState();
  const [user_firstname, setFirstName] = useState();
  const [user_lastname, setLastName] = useState();
  const [user_role, setRole] = useState();
  const role_list = ["Patron", "Commercial", "Administrateur"];

  const { id } = useParams(); // Unpacking and retrieve id
  const api_path = `/users/${id}`;
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const user_copy = { ...user };
    user_copy.id = user_id;
    user_copy.firstname = user_firstname;
    user_copy.lastname = user_lastname;
    user_copy.role = user_role;
    console.log(user_copy);
    setUser(user_copy);
    axios
      .put(`http://localhost:3001/api${api_path}`, {
        id: user_id,
        firstname: user_firstname,
        lastname: user_lastname,
        role: user_role,
      })
      .then(() => {
        console.log("PUT GOOD");
      })
      .catch(() => {
        console.log("PUT FAIL");
      });
    navigate("/users", { replace: true });
  };

  console.log("UserEdit: id: ", id);

  // same as componentDidMount() only => the key is []
  useEffect(() => {
    axios
      .get(api_path)
      .then((response) => {
        console.log("UserEdit: data api : ", response.data);
        setUser(response.data);
        setUserId(response.data.id);
        setFirstName(response.data.firstname);
        setLastName(response.data.lastname);
        setRole(response.data.role);
      })
      .catch((error) => console.log(error));
  }, []);

  // check id type as int
  if (isNaN(id) || (parseFloat(id) | 0) !== parseFloat(id)) {
    // todo: do it better
    return <h1>InvoiceEdit Error: param 'id' is not an integer</h1>;
  }

  return (
    <div className="content">
      <div className="container">
        <h1 className="mb-5">Modification de l'utilisateur</h1>

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
                  N° de l'utilisateur
                </th>
                <td>
                  <input
                    className="text-center"
                    type="number"
                    required
                    min="0"
                    value={user_id || ""}
                    onChange={(e) => setUserId(e.target.value)}
                  ></input>
                </td>
              </tr>
              <tr>
                <th scope="row">Prénom</th>
                <td>
                  <input
                    className="text-center"
                    type="text"
                    required
                    value={user_firstname || ""}
                    onChange={(e) => {
                      const result = e.target.value.replace(/[^a-z\s]/gi, "");
                      const final_result = result.replace(/\s\s+/g, " ");
                      setFirstName(final_result);
                    }}
                  ></input>
                </td>
              </tr>
              <tr>
                <th scope="row">Nom</th>
                <td>
                  <input
                    className="text-center"
                    type="text"
                    required
                    value={user_lastname || ""}
                    onChange={(e) => {
                      const result = e.target.value.replace(/[^a-z\s]/gi, "");
                      const final_result = result.replace(/\s\s+/g, " ");
                      setLastName(final_result);
                    }}
                  ></input>
                </td>
              </tr>
              <tr>
                <th scope="row">Rôle</th>
                <td>
                  <select
                    value={user_role}
                    onChange={(e) => {
                      setRole(e.target.value);
                    }}
                  >
                    {role_list.map((key) => {
                      return <option key={key}>{key}</option>;
                    })}
                  </select>
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
              navigate("/users", { replace: true });
            }}
          >
            Annuler
          </button>
        </form>
      </div>
    </div>
  );
};

export default OrderEdit;
