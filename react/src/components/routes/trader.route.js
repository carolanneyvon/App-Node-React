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
import CustomersList from "../domain/customer/CustomersList";
import CustomerView from "../domain/customer/CustomerView";
import CustomerEdit from "../domain/customer/CustomerEdit";
import CustomerCreate from "../domain/customer/CustomerCreate";
import NotFound from "../NotFound";
import StocksList from "../domain/stock/StocksList";
import StockView from "../domain/stock/StockView";
import StockEdit from "../domain/stock/StockEdit";
import Dashboard from "../Dashboard";

const TraderRoute = (props) => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Dashboard role={props.role} />} />
        <Route path="/orders" element={<OrdersList />} />
        <Route path="/orders/:id/view" element={<OrderView />} />
        <Route path="/orders/:id/edit" element={<OrderEdit />} />
        <Route path="/orders/add" element={<OrderCreate />} />

        <Route path="/quotes" element={<QuotesList role={props.role} />} />
        <Route path="/quotes/:id/view" element={<QuoteView />} />
        <Route path="/quotes/:id/edit" element={<QuoteEdit />} />
        <Route path="/quotes/add" element={<QuoteCreate />} />

        <Route path="/invoices" element={<InvoicesList />} />
        <Route path="/invoices/:id/view" element={<InvoiceView />} />
        <Route path="/invoices/:id/edit" element={<InvoiceEdit />} />
        <Route path="/invoices/add" element={<InvoiceCreate />} />

        <Route path="/vehicles" element={<VehiclesList />} />
        <Route path="/vehicles/:id/view" element={<VehicleView />} />

        <Route path="/stocks" element={<StocksList role={props.role} />} />
        <Route path="/stocks/:id/view" element={<StockView />} />
        <Route path="/stocks/:id/edit" element={<StockEdit />} />
        {/*<Route path="/stocks/add" element={<StockCreate />} /> */}

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

export default TraderRoute;
