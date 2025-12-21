import { createBrowserRouter } from "react-router";
import Home from "../pages/Home/Home/Home";
import Rootlayout from "../layouts/Rootlayout";
import Authlayout from "../layouts/Authlayout";
import Login from "../pages/Auth/Login/Login";
import Register from "../pages/Auth/Register/Register";
import AllProducts from "../pages/Shared/AllProducts/AllProducts";
import ProductDetails from "../pages/ProductDetails/ProductDetails";
import PrivateRoute from "./PrivateRoute";
import Order from "../pages/Order/Order";
import DashboardLayout from "../layouts/DashboardLayout";
import MyOrders from "../pages/Dashboard/MyOrders/MyOrders";
import Payment from "../pages/Dashboard/Payment/Payment";
import PaymentSuccessful from "../pages/Dashboard/Payment/PaymentSuccessful";
import PaymentCancelled from "../pages/Dashboard/Payment/PaymentCancelled";
import MyProfile from "../pages/Dashboard/MyProfile/MyProfile";
import ManageUsers from "../pages/Dashboard/ManageUsers/ManageUsers";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Rootlayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "all-product",
        Component: AllProducts
      },
      {
        path: "/product/:id",
        element: <PrivateRoute>
          <ProductDetails></ProductDetails>
        </PrivateRoute>
      },
      {
        path: "/order",
        element: <PrivateRoute>
          <Order></Order>
        </PrivateRoute>
      },
    ]
  },
  {
    path: '/',
    Component: Authlayout,
    children: [
      {
        path: "login",
        Component: Login
      },
      {
        path: "register",
        Component: Register
      },
    ]
  },
  {
    path: 'dashboard',
    element: <PrivateRoute>
      <DashboardLayout></DashboardLayout>
    </PrivateRoute>,
    children: [
      {
        path: 'my-orders',
        Component: MyOrders
      },
      {
        path: 'payment/:id',
        Component: Payment
      },
      {
        path: 'payment-success',
        Component: PaymentSuccessful
      },
      {
        path: 'payment-cancelled',
        Component: PaymentCancelled
      },
      {
        path: 'my-profile',
        Component: MyProfile
      },
      {
        path: 'manage-users',
        Component: ManageUsers
      },
    ]
  }
]);