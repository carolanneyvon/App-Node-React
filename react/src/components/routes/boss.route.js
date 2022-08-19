import React from "react";
import { Route, Routes } from "react-router-dom";
import OrdersList from "../domain/order/OrdersList";
import OrderView from "../domain/order/OrderView";
import OrderEdit from "../domain/order/OrderEdit";
import OrderCreate from "../domain/order/OrderCreate";
import QuotesList from "../domain/quote/QuotesList";
import QuoteView from "../domain/quote/QuoteView";
import QuoteEdit from "../domain/quote/QuoteEdit";
import QuoteCreate from "../domain/quote/QuoteCreate";
import InvoicesList from "../domain/invoice/InvoicesList";
import InvoiceView from "../domain/invoice/InvoiceView";
import InvoiceEdit from "../domain/invoice/InvoiceEdit";
import InvoiceCreate from "../domain/invoice/InvoiceCreate";
import VehiclesList from "../domain/vehicle/VehiclesList";
import VehicleView from "../domain/vehicle/VehicleView";
import VehicleEdit from "../domain/vehicle/VehicleEdit";
import VehicleCreate from "../domain/vehicle/VehicleCreate";
import CustomersList from "../domain/customer/CustomersList";
import CustomerView from "../domain/customer/CustomerView";
import CustomerEdit from "../domain/customer/CustomerEdit";
import CustomerCreate from "../domain/customer/CustomerCreate";
import NotFound from "../NotFound";
import Dashboard from "../Dashboard";

const BossRoute = (props) => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Dashboard role={props.role} />} />
        <Route path="/orders" element={<OrdersList role={props.role} />} />
        <Route path="/orders/:id/view" element={<OrderView />} />
        <Route path="/orders/:id/edit" element={<OrderEdit />} />
        <Route path="/orders/add" element={<OrderCreate />} />

        <Route path="/quotes" element={<QuotesList role={props.role} />} />
        <Route path="/quotes/:id/view" element={<QuoteView />} />
        <Route path="/quotes/:id/edit" element={<QuoteEdit />} />
        <Route path="/quotes/add" element={<QuoteCreate />} />

        <Route path="/invoices" element={<InvoicesList role={props.role} />} />
        <Route path="/invoices/:id/view" element={<InvoiceView />} />
        <Route path="/invoices/:id/edit" element={<InvoiceEdit />} />
        <Route path="/invoices/add" element={<InvoiceCreate />} />

        <Route path="/vehicles" element={<VehiclesList role={props.role} />} />
        <Route path="/vehicles/:id/view" element={<VehicleView />} />
        <Route path="/vehicles/:id/edit" element={<VehicleEdit />} />
        <Route path="/vehicles/add" element={<VehicleCreate />} />

        <Route
          path="/customers"
          element={<CustomersList role={props.role} />}
        />
        <Route path="/customers/:id/view" element={<CustomerView />} />
        <Route path="/customers/:id/edit" element={<CustomerEdit />} />
        <Route path="/customers/add" element={<CustomerCreate />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default BossRoute;
