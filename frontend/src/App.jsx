import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Canteen from "./pages/Canteen";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
import OrderSuccess from "./pages/OrderSuccess";
import Admin from "./pages/Admin";

import Library from "./pages/Library";
import LibraryAdmin from "./pages/LibraryAdmin";
import BookSearch from "./pages/BookSearch";
import BookAdmin from "./pages/BookAdmin";
import MyLibraryBookings from "./pages/MyLibraryBookings";

import Bus from "./pages/Bus";
import BusAdmin from "./pages/BusAdmin";

import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";

import Stationery from "./pages/Stationery";
import StationeryAdmin from "./pages/StationeryAdmin";
import StationeryCart from "./pages/StationeryCart";
import StationeryOrders from "./pages/StationeryOrders";

import PrintUpload from "./pages/PrintUpload";
import PrintAdmin from "./pages/PrintAdmin";


function App() {

  return (

    <BrowserRouter>

      <Routes>

        {/* PUBLIC ROUTES */}

        <Route
          path="/"
          element={<Landing />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        {/* USER ROUTES */}

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/canteen"
          element={
            <ProtectedRoute>
              <Canteen />
            </ProtectedRoute>
          }
        />

        <Route
  path="/print-upload"
  element={
    <ProtectedRoute>
      <PrintUpload />
    </ProtectedRoute>
  }
/>

        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />

        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <Orders />
            </ProtectedRoute>
          }
        />

        <Route
          path="/order-success"
          element={
            <ProtectedRoute>
              <OrderSuccess />
            </ProtectedRoute>
          }
        />

        <Route
          path="/library"
          element={
            <ProtectedRoute>
              <Library />
            </ProtectedRoute>
          }
        />

        <Route
          path="/book-search"
          element={
            <ProtectedRoute>
              <BookSearch />
            </ProtectedRoute>
          }
        />


       <Route
  path="/my-library-bookings"
  element={
    <ProtectedRoute>
      <MyLibraryBookings />
    </ProtectedRoute>
  }
/>

        <Route
          path="/bus"
          element={
            <ProtectedRoute>
              <Bus />
            </ProtectedRoute>
          }
        />

        <Route
  path="/stationery"
  element={
    <ProtectedRoute>
      <Stationery />
    </ProtectedRoute>
  }
/>

<Route
  path="/stationery-cart"
  element={
    <ProtectedRoute>
      <StationeryCart />
    </ProtectedRoute>
  }
/>

<Route
  path="/stationery-orders"
  element={
    <ProtectedRoute>
      <StationeryOrders />
    </ProtectedRoute>
  }
/>

        {/* ADMIN ROUTES */}

        <Route
          path="/admin"
          element={
            <AdminRoute>
              <Admin />
            </AdminRoute>
          }
        />

        <Route
          path="/library-admin"
          element={
            <AdminRoute>
              <LibraryAdmin />
            </AdminRoute>
          }
        />

        <Route
  path="/book-admin"
  element={
    <AdminRoute>
      <BookAdmin />
    </AdminRoute>
  }
/>

        <Route
          path="/bus-admin"
          element={
            <AdminRoute>
              <BusAdmin />
            </AdminRoute>
          }
        />

        <Route
  path="/stationery-admin"
  element={
    <AdminRoute>
      <StationeryAdmin />
    </AdminRoute>
  }
/>

<Route
  path="/print-admin"
  element={
    <AdminRoute>
      <PrintAdmin />
    </AdminRoute>
  }
/>
      </Routes>

    </BrowserRouter>

  );

}

export default App;