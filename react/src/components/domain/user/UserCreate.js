import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const OrderCreate = () => {
  const [user, setUser] = useState({});
  const [user_firstname, setFirstName] = useState();
  const [user_lastname, setLastName] = useState();
  const [user_role, setRole] = useState();
  const role_list = ["Patron", "Commercial", "Administrateur"];

  const api_path = `/users`;
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const user_copy = { ...user };
    user_copy.firstname = user_firstname;
    user_copy.lastname = user_lastname;
    user_copy.role = user_role;
    console.log(user_copy);
    setUser(user_copy);
    axios
      .post(`http://localhost:3001/api${api_path}`, {
        firstname: user_firstname,
        lastname: user_lastname,
        role: user_role,
      })
      .then(() => {
        console.log("POST GOOD");
      })
      .catch(() => {
        console.log("POST FAIL");
      });
    navigate("/users", { replace: true });
  };

  // same as componentDidMount() only => the key is []
  useEffect(() => {
    axios
      .get(api_path)
      .then((response) => {
        console.log("UserEdit: data api : ", response.data);
        setUser(response.data);
        setFirstName(response.data.firstname);
        setLastName(response.data.lastname);
        setRole(response.data.role);
      })
      .catch((error) => console.log(error));
  }, []);

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
            Créer
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

export default OrderCreate;
