import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const CustomerEdit = () => {
  const [customer, setCustomer] = useState({});
  const [customer_id, setCustomerId] = useState();
  const [customer_firstname, setCustomerFirstName] = useState("");
  const [customer_lastname, setCustomerLastName] = useState("");
  const [customer_address, setCustomerAddress] = useState("");
  const [customer_zip, setCustomerZIP] = useState("");
  const [customer_city, setCustomerCity] = useState("");
  const [customer_phone, setCustomerPhone] = useState("");
  const [customer_mobile, setCustomerMobile] = useState("");
  const [customer_creator, setCustomerCreator] = useState("");
  const [creators_list, setCreatorsList] = useState({});

  const { id } = useParams(); // Unpacking and retrieve id
  const api_path = `/customers/${id}`;
  const creators_path = "/users";
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const customer_copy = { ...customer };
    customer_copy.id = customer_id;
    customer_copy.firstname = customer_firstname;
    customer_copy.lastname = customer_lastname;
    customer_copy.address = customer_address;
    customer_copy.zip = customer_zip;
    customer_copy.city = customer_city;
    customer_copy.phone = customer_phone;
    customer_copy.mobile = customer_mobile;
    customer_copy.creatorId = customer_creator.id;
    console.log(customer_copy);
    setCustomer(customer_copy);
    axios
      .put(`http://localhost:3001/api${api_path}`, {
        id: customer_id,
        firstname: customer_firstname,
        lastname: customer_lastname,
        address: customer_address,
        zip: customer_zip,
        city: customer_city,
        phone: customer_phone,
        mobile: customer_mobile,
        creatorId: customer_creator.id,
      })
      .then(() => {
        console.log("PUT GOOD");
      })
      .catch(() => {
        console.log("PUT FAIL");
      });
    navigate("/customers", { replace: true });
  };

  console.log("CustomerEdit: id: ", id);

  // same as componentDidMount() only => the key is []
  useEffect(() => {
    axios
      .get(api_path)
      .then((response) => {
        console.log("CustomerEdit: data api : ", response.data);
        setCustomer(response.data);
        setCustomerId(response.data.id);
        setCustomerFirstName(response.data.firstname);
        setCustomerLastName(response.data.lastname);
        setCustomerAddress(response.data.address);
        setCustomerZIP(response.data.zip);
        setCustomerCity(response.data.city);
        setCustomerPhone(response.data.phone);
        setCustomerMobile(response.data.mobile);
        setCustomerCreator(response.data.creator);
      })
      .catch((error) => console.log(error));
    axios
      .get(creators_path)
      .then((response) => {
        console.log("Creators: ", response.data);
        setCreatorsList(response.data);
        console.log(creators_list);
      })
      .catch((error) => console.log(error));
  }, []);

  // check id type as int
  if (isNaN(id) || (parseFloat(id) | 0) !== parseFloat(id)) {
    // todo: do it better
    return <h1>CustomerEdit Error: param 'id' is not an integer</h1>;
  }

  return (
    <div className="content">
      <div className="container">
        <h1 className="mb-5">Modification du client</h1>

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
                  N° du client
                </th>
                <td>
                  <input
                    className="text-center"
                    type="number"
                    required
                    value={customer_id || ""}
                    onChange={(e) => setCustomerId(e.target.value)}
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
                    value={customer_firstname || ""}
                    onChange={(e) => {
                      const result = e.target.value.replace(/[^a-z\s]/gi, "");
                      const final_result = result.replace(/\s\s+/g, " ");
                      setCustomerFirstName(final_result);
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
                    value={customer_lastname || ""}
                    onChange={(e) => {
                      const result = e.target.value.replace(/[^a-z\s]/gi, "");
                      const final_result = result.replace(/\s\s+/g, " ");
                      setCustomerLastName(final_result);
                    }}
                  ></input>
                </td>
              </tr>
              <tr>
                <th scope="row">Adresse</th>
                <td>
                  <input
                    className="text-center"
                    type="text"
                    required
                    value={customer_address || ""}
                    onChange={(e) => {
                      setCustomerAddress(e.target.value);
                    }}
                  ></input>
                </td>
              </tr>
              <tr>
                <th scope="row">ZIP</th>
                <td>
                  <input
                    className="text-center"
                    type="text"
                    required
                    value={customer_zip || ""}
                    pattern="[0-9]{5}"
                    onChange={(e) => {
                      setCustomerZIP(e.target.value);
                    }}
                  ></input>
                </td>
              </tr>
              <tr>
                <th scope="row">Ville</th>
                <td>
                  <input
                    className="text-center"
                    type="text"
                    required
                    value={customer_city || ""}
                    onChange={(e) => {
                      const result = e.target.value.replace(/[^a-z\s]/gi, "");
                      const final_result = result.replace(/\s\s+/g, " ");
                      setCustomerCity(final_result);
                    }}
                  ></input>
                </td>
              </tr>
              <tr>
                <th scope="row">Téléphone</th>
                <td>
                  <input
                    className="text-center"
                    type="text"
                    value={customer_phone || ""}
                    onChange={(e) => {
                      setCustomerPhone(e.target.value);
                    }}
                  ></input>
                </td>
              </tr>
              <tr>
                <th scope="row">Mobile</th>
                <td>
                  <input
                    className="text-center"
                    type="text"
                    required
                    value={customer_mobile || ""}
                    onChange={(e) => {
                      setCustomerMobile(e.target.value);
                    }}
                  ></input>
                </td>
              </tr>
              <tr>
                <th scope="row">Créateur</th>
                <td>
                  <select
                    className="text-center"
                    value={customer_creator.id || ""}
                    onChange={(e) => {
                      setCustomerCreator(creators_list[e.target.selectedIndex]);
                    }}
                  >
                    {Object.keys(creators_list).map((key) => {
                      return (
                        <option key={key} value={creators_list[key].id}>
                          {`${creators_list[key].firstname} ${creators_list[key].lastname}`}
                        </option>
                      );
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
              navigate("/customers", { replace: true });
            }}
          >
            Annuler
          </button>
        </form>
      </div>
    </div>
  );
};

export default CustomerEdit;
