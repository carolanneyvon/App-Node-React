import OrderRow from "./OrderRow";
import { useNavigate } from "react-router-dom";
import { useApiEffect } from "../../hook/useApi";

const OrdersList = (props) => {
  const api_path = "/orders";
  const [orders, setOrders /*, pending, error*/] = useApiEffect(api_path); // Custom Hook from context Api
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
        <h2 className="mb-5">Commandes</h2>
        <div className="table-responsive">
          <table className="table table-striped custom-table">
            <thead>
              <tr>
                <th scope="col">Order</th>
                <th scope="col">Customer</th>
                <th scope="col">Vehicle</th>
                <th scope="col">Priority</th>
                {show()}
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => {
                return (
                  <OrderRow
                    key={index}
                    order={order}
                    index={index}
                    orders={orders}
                    setOrders={setOrders}
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

export default OrdersList;
