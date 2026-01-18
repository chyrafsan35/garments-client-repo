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
import AdminRoute from "./AdminRoute";
import AdminAllProducts from "../pages/Dashboard/AdminAllProducts/AdminAllProducts";
import AllOrders from "../pages/Dashboard/AllOrders/AllOrders";
import ManagerRoute from "./ManagerRoute";
import AddProducts from "../pages/Dashboard/AddProducts/AddProducts";
import ManageProducts from "../pages/Dashboard/ManageProducts/ManageProducts";
import PendingOrders from "../pages/Dashboard/PendingOrders/PendingOrders";
import ApprovedOrders from "../pages/Dashboard/ApprovedOrders/ApprovedOrders";
import AboutUs from "../pages/AboutUs/AboutUs";
import Contact from "../pages/Contact/Contact";
import Feedback from "../pages/Feedback/Feedback";
import Help from "../pages/Help/Help";
import CustomerDashboard from "../pages/Dashboard/CustomerDashboard/CustomerDashboard";

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
        path: "about-us",
        Component: AboutUs
      },
      {
        path: "contact",
        Component: Contact
      },
      {
        path: "feedback",
        Component: Feedback
      },
      {
        path: "help",
        Component: Help
      },
      {
        path: "/product/:id",
        Component: ProductDetails
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
        index: true,
        Component: CustomerDashboard
      },
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
        element: <AdminRoute><ManageUsers></ManageUsers></AdminRoute>
      },
      {
        path: 'all-products',
        element: <AdminRoute><AdminAllProducts></AdminAllProducts></AdminRoute>
      },
      {
        path: 'all-orders',
        element: <AdminRoute><AllOrders></AllOrders></AdminRoute>
      },
      {
        path: 'add-products',
        element: <ManagerRoute><AddProducts></AddProducts></ManagerRoute>
      },
      {
        path: 'manage-products',
        element: <ManagerRoute><ManageProducts></ManageProducts></ManagerRoute>
      },
      {
        path: 'pending-orders',
        element: <ManagerRoute><PendingOrders></PendingOrders></ManagerRoute>
      },
      {
        path: 'approved-orders',
        element: <ManagerRoute><ApprovedOrders></ApprovedOrders></ManagerRoute>
      },
    ]
  }
]);