import React from "react";
import { NavLink } from "react-router-dom";
import { logout } from "./login/FunLogin";

const Nav = (props) => {
  const nav_button = () => {
    if (props.role === "Administrateur") {
      return (
        <>
          <li className="nav-item px-3">
            <NavLink to="/users">
              <button className="btn btn-light">Utilisateurs</button>
            </NavLink>
          </li>
          <li className="nav-item px-3">
            <NavLink to="/stocks">
              <button className="btn btn-light">Stock</button>
            </NavLink>
          </li>
        </>
      );
    }
    if (props.role === "Patron") {
      return (
        <>
          <li className="nav-item px-3">
            <NavLink to="/">
              <button className="btn btn-light">Dashboard</button>
            </NavLink>
          </li>
          <li className="nav-item px-3">
            <NavLink to="/quotes">
              <button className="btn btn-light">Devis</button>
            </NavLink>
          </li>
          <li className="nav-item px-3">
            <NavLink to="/orders">
              <button className="btn btn-light">Commandes</button>
            </NavLink>
          </li>
          <li className="nav-item px-3">
            <NavLink to="/invoices">
              <button className="btn btn-light">Factures</button>
            </NavLink>
          </li>
          <li className="nav-item px-3">
            <NavLink to="/vehicles">
              <button className="btn btn-light">Véhicules</button>
            </NavLink>
          </li>
          <li className="nav-item px-3">
            <NavLink to="/customers">
              <button className="btn btn-light">Clients</button>
            </NavLink>
          </li>
        </>
      );
    }
    if (props.role === "Commercial") {
      return (
        <>
          <li className="nav-item px-3">
            <NavLink to="/">
              <button className="btn btn-light">Dashboard</button>
            </NavLink>
          </li>
          <li className="nav-item px-3">
            <NavLink to="/quotes">
              <button className="btn btn-light">Devis</button>
            </NavLink>
          </li>
          <li className="nav-item px-3">
            <NavLink to="/orders">
              <button className="btn btn-light">Commandes</button>
            </NavLink>
          </li>
          <li className="nav-item px-3">
            <NavLink to="/invoices">
              <button className="btn btn-light">Factures</button>
            </NavLink>
          </li>
          <li className="nav-item px-3">
            <NavLink to="/vehicles">
              <button className="btn btn-light">Véhicules</button>
            </NavLink>
          </li>
          <li className="nav-item px-3">
            <NavLink to="/stocks">
              <button className="btn btn-light">Stock</button>
            </NavLink>
          </li>
          <li className="nav-item px-3">
            <NavLink to="/customers">
              <button className="btn btn-light">Clients</button>
            </NavLink>
          </li>
        </>
      );
    }
  };

  const handleSubmitLogout = (e) => {
    try {
      logout();
      props.setIsConnected(false);
      props.setUserConnected({});
    } catch (err) {
      console.log("Logout Failed", err);
    }
  };

  return (
    <>
      <nav
        className="navbar navbar-expand-lg navbar-dark bg-dark"
        aria-label="Fifth navbar example"
      >
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            FunTeam
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarsExample05"
            aria-controls="navbarsExample05"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          {props.isConnected && (
            <div className="collapse navbar-collapse" id="navbarsExample05">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                {nav_button()}
              </ul>
              <button
                onClick={handleSubmitLogout}
                type="submit"
                className="btn btn-info"
                aria-label="Logout"
              >
                Se déconnecter
              </button>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default Nav;
