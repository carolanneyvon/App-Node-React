import axios from 'axios';
import {useNavigate, useParams} from 'react-router-dom';
import {useEffect, useState} from 'react';

const QuoteEdit = () => {
    const [quote, setQuote] = useState({});
    const [quote_status, setQuoteStatus] = useState();
    const [quote_creator, setQuoteCreator] = useState("");
    const [quote_customer, setQuoteCustomer] = useState("");
    const [quote_vehicle, setQuoteVehicle] = useState("");
    const [creators_list, setCreatorsList] = useState({});
    const [customers_list, setCustomersList] = useState({});
    const [vehicles_list, setVehicleList] = useState({});

    const {id} = useParams(); // Unpacking and retrieve id
    const api_path = `/quotes/${id}`;
    const customer_path = '/customers';
    const creators_path = "/users";
    const vehicles_path = "/vehicles";
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const quote_copy = {...quote};
        quote_copy.status = quote_status;
        quote_copy.creatorId = quote_creator.id;
        quote_copy.customerId = quote_customer.id;
        quote_copy.vehicleId = quote_vehicle.id;
        console.log(quote_copy);
        setQuote(quote_copy);
        axios.put(`http://localhost:3001/api${api_path}`,
            {
                status: quote_status,
                creatorId: quote_creator.id,
                customerId: quote_customer.id,
                vehicleId: quote_vehicle.id
            }).then(() => {
            console.log('PUT GOOD');
        }).catch(() => {console.log('PUT FAIL');});
        navigate(-1, {replace:true});
    };

    console.log('QuoteEdit: id: ', id);

    useEffect(() => {
        axios.get(api_path).then((response) => {
            console.log('QuoteEdit: data api : ', response.data);
            setQuote(response.data);
            setQuoteStatus(response.data.status);
            setQuoteCreator(response.data.creator);
            setQuoteCustomer(response.data.customer);
            setQuoteVehicle(response.data.vehicle);
        }).catch((error) => console.log(error));
        axios.get(customer_path).then((response) => {
            console.log('Customers: ', response.data);
            setCustomersList(response.data);
            console.log(customers_list);
        }).catch((error) => console.log(error));
        axios
        .get(creators_path)
        .then((response) => {
          console.log("Creators: ", response.data);
          setCreatorsList(response.data);
          console.log(creators_list);
        })
        .catch((error) => console.log(error));
        axios
        .get(vehicles_path)
        .then((response) => {
          console.log("Vehicule: ", response.data);
          setVehicleList(response.data);
          console.log(vehicles_list);
        })
        .catch((error) => console.log(error));
    }, []);

    // check id type as int
    if (isNaN(id) || (parseFloat(id) | 0) !== parseFloat(id)) {
        // todo: do it better
        return <h1>QuoteEdit Error: param 'id' is not an integer</h1>;
    }

    return (
        <div className="content">
            <div className="container">
                <h1 className="mb-5">Modification du devis</h1>

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
                            <th scope="row" className="col-4">Status
                            </th>
                            <td><input className="text-center" type="text"
                                       required min="0"
                                       value={quote_status || ''}
                                       onChange={(e) => quote_status(
                                           e.target.value)}></input>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">Client</th>
                            <td>
                            <select
                                className="text-center"
                                value={quote_customer.id || ""}
                                onChange={(e) => {
                                setQuoteCustomer(customers_list[e.target.selectedIndex]);
                                }}
                            >
                                {Object.keys(customers_list).map((key) => {
                                return (
                                    <option key={key} value={customers_list[key].id}>
                                    {`${customers_list[key].firstname} ${customers_list[key].lastname}`}
                                    </option>
                                );
                                })}
                            </select>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">Véhicule</th>
                            <td>
                            <select
                                className="text-center"
                                value={quote_vehicle.id || ""}
                                onChange={(e) => {
                                setQuoteCreator(vehicles_list[e.target.selectedIndex]);
                                }}
                            >
                                {Object.keys(vehicles_list).map((key) => {
                                return (
                                    <option key={key} value={vehicles_list[key].id}>
                                    {`${vehicles_list[key].manufacturer} ${vehicles_list[key].model}`}
                                    </option>
                                );
                                })}
                            </select>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">Créateur du devis</th>
                            <td>
                            <select
                                className="text-center"
                                value={quote_creator.id || ""}
                                onChange={(e) => {
                                setQuoteCreator(creators_list[e.target.selectedIndex]);
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
                    <button className="btn btn-success"
                            type="submit">Sauvegarder
                    </button>
                    <button className="btn btn-danger"
                            onClick={() => {
                                navigate("/quotes", {replace: true});
                            }}>Annuler
                    </button>
                </form>
            </div>
        </div>
    );
};

export default QuoteEdit;
