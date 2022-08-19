import { useEffect, useState } from "react";
import { useApiEffect } from "./hook/useApi";
import QuoteRow from "./domain/quote/QuoteRow";
import UserRow from "./domain/user/UserRow";

const Dashboard = (props) => {
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    const role = JSON.parse(localStorage.getItem("currentUser"));
    console.log(role.role);
    setRoles(role.role);
  });

  const api_path_quotes = "/quotes";
  // Custom hook api.useApi
  const [quotes, setQuotes] = useApiEffect(api_path_quotes);
  const filtered_quote = quotes.filter((filter) => {
    return filter.status == "En attente";
  });

  const api_path_user = "/users";
  // Custom hook api.useApi
  const [users, setUsers] = useApiEffect(api_path_user);
  const filtered_user = users.filter((filter) => {
    return filter.role == "Commercial";
  });

  if (props.role === "Commercial") {
    return (
      <div className="content">
        <div className="container">
          <h2 className="mb-5">Devis en attente</h2>
          <div className="table-responsive">
            <table className="table table-striped custom-table">
              <thead>
                <tr>
                  <th scope="col">N° de devis</th>
                  <th scope="col">Client</th>
                  <th scope="col">Véhicule</th>
                  <th scope="col">Date du devis</th>
                  <th scope="col">Status</th>
                </tr>
              </thead>
              <tbody>
                {filtered_quote.map((quote, index) => {
                  return (
                    <QuoteRow
                      key={index}
                      index={index}
                      quote={quote}
                      quotes={quotes}
                      setQuotes={setQuotes}
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
  }
  if (props.role === "Patron") {
    return (
      <div className="content">
        <div className="container">
          <h2 className="mb-5">Gestion des Commerciaux</h2>
          <div className="table-responsive">
            <table className="table table-striped custom-table">
              <thead>
                <tr>
                  <th scope="col">User</th>
                  <th scope="col">Nom</th>
                  <th scope="col">Prénom</th>
                  <th scope="col">Rôle</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {filtered_user.map((user, index) => {
                  return (
                    <UserRow
                      key={index}
                      user={user}
                      index={index}
                      users={users}
                      setUsers={setUsers}
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
  }
  if (props.role === "Administrateur") {
    return (
      <div className="content">
        <div className="container">
          <h2 className="mb-5">Gestion Utilisateurs</h2>
          <div className="table-responsive">
            <table className="table table-striped custom-table">
              <thead>
                <tr>
                  <th scope="col">User</th>
                  <th scope="col">Nom</th>
                  <th scope="col">Prénom</th>
                  <th scope="col">Rôle</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => {
                  return (
                    <UserRow
                      key={index}
                      user={user}
                      index={index}
                      users={users}
                      setUsers={setUsers}
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
  }
};

export default Dashboard;
