import "./App.css";
import { RouterProvider, createBrowserRouter, createHashRouter,} from "react-router-dom";
import Layout from "./pages/Layout/Layout";
import Register from "./pages/Register/Register";
import NotFound from "./pages/NotFound/NotFound";
import Login from "./pages/Login/Login";
import UserContextProvider from "./Context/UserContext";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import { QueryClient, QueryClientProvider } from "react-query";
import { CartContextProvider } from "./Context/CartContext";
import { Toaster } from "react-hot-toast";
import { Offline } from "react-detect-offline";
import { WishlistContextProvider } from "./Context/WishlistContext";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import VerifyCode from "./pages/VerifyCode/VerifyCode";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import Brands from "./pages/Brands/Brands";
import Wishlist from "./pages/Wishlist/Wishlist";
import Checkout from "./pages/Checkout/Checkout";
import Categories from "./pages/Categories/Categories";
import AllOrders from "./pages/AllOrders/AllOrders";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


const queryClient = new QueryClient();

function App() {
  const routers = createHashRouter([
    {
      path: "",
      element: <Layout />,
      children: [
        {
          index: true,
          element: (
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          ),
        },
        { path: "register", element: <Register /> },
        {
          path: "wishlist",
          element: (
            <ProtectedRoute>
              <Wishlist />
            </ProtectedRoute>
          ),
        },
        {
          path: "details/:id",
          element: (
            <ProtectedRoute>
              <ProductDetails />
            </ProtectedRoute>
          ),
        },
        {
          path: "cart",
          element: (
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          ),
        },
        {
          path: "checkout",
          element: (
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          ),
        },
        {
          path: "allorders",
          element: (
            <ProtectedRoute>
              <AllOrders />
            </ProtectedRoute>
          ),
        },
        {
          path: "forgotpassword",
          element: <ForgotPassword />,
        },
        {
          path: "resetpassword",
          element: <ResetPassword />,
        },
        {
          path: "verifyCode",
          element: <VerifyCode />,
        },
        {
          path: "brands",
          element: (
            <ProtectedRoute>
              <Brands />
            </ProtectedRoute>
          ),
        },
        {
          path: "categories",
          element: (
            <ProtectedRoute>
              <Categories />
            </ProtectedRoute>
          ),
        },
        { path: "login", element: <Login /> },
        { path: "*", element: <NotFound /> },
      ],
    },
  ]);

  return (
    <WishlistContextProvider>
      <CartContextProvider>
        <Offline>
          <div className="offlineMessage">
            <i className="fa-solid fa-wifi"></i> You are offline now !
          </div>
        </Offline>
        <QueryClientProvider client={queryClient}>
          <UserContextProvider>
            <RouterProvider router={routers}></RouterProvider>
          </UserContextProvider>
        </QueryClientProvider>
        <Toaster />
      </CartContextProvider>
    </WishlistContextProvider>
  );
}

export default App;
