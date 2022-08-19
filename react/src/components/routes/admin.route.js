import React from "react";
import { Route, Routes } from "react-router-dom";
import UsersList from "../domain/user/UsersList";
import UserView from "../domain/user/UserView";
import UserEdit from "../domain/user/UserEdit";
import UserCreate from "../domain/user/UserCreate";
import NotFound from "../NotFound";
import StocksList from "../domain/stock/StocksList";
import StockView from "../domain/stock/StockView";
import StockEdit from "../domain/stock/StockEdit";
import Dashboard from "../Dashboard";

const AdminRoute = (props) => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Dashboard role={props.role} />} />
        <Route path="/users" element={<UsersList role={props.role} />} />
        <Route
          role={props.role}
          path="/users/:id/view"
          element={<UserView />}
        />
        <Route path="/users/:id/edit" element={<UserEdit />} />
        <Route path="/users/add" element={<UserCreate />} />

        <Route path="/stocks" element={<StocksList role={props.role} />} />
        <Route path="/stocks/:id/view" element={<StockView />} />
        <Route path="/stocks/:id/edit" element={<StockEdit />} />
        {/*<Route path="/stocks/add" element={<StockCreate />} /> */}

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default AdminRoute;
