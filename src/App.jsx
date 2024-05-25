import HomePage from "./routes/homePage/homePage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ListPage from "./routes/listPage/listPage";
import { Layout, RequireAdmin, RequireAuth } from "./routes/layout/layout";
import SinglePage from "./routes/singlePage/singlePage";
import ProfilePage from "./routes/profilePage/profilePage";
import Login from "./routes/login/login";
import Register from "./routes/register/register";
import ProfileUpdatePage from "./routes/profileUpdatePage/profileUpdatePage";
import NewTeamPage from "./routes/newTeamPage/newTeamPage";
import { singlePageLoader, listPageLoader } from "./lib/loader";
import AdminLogin from "./routes/adminLogin/adminLogin";
import NewGamePage from "./routes/newGamePage/newGamePage";
import AdminPage from "./routes/adminPage/adminPage";
import AdminTeamListPage from "./routes/adminTeamListPage/adminTeamListPage";
import AdminProfilePage from "./routes/adminProfilePage/adminProfilePage";
import Games from "./routes/games";
import GameDetail from "./routes/games/singleGame";
import ContactPage from "./routes/contactPage/contactPage";
import AdminGames from "./routes/adminGames/adminGames";
import AdminGameDetail from "./routes/adminGames/adminGameDetail";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <HomePage />,
        },
        {
          path: "/contact",
          element: <ContactPage />,
        },
        {
          path: "/list",
          element: <ListPage />,
          loader: listPageLoader,
        },
        {
          path: "/team/:id",
          element: <SinglePage />,
          loader: singlePageLoader,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/register",
          element: <Register />,
        },
        {
          path: "/admin/login",
          element: <AdminLogin />,
        },
        {
          path: "/games",
          element: <Games />,
        },
        {
          path: "/game/:id",
          element: <GameDetail />,
        },
      ],
    },
    {
      path: "/",
      element: <RequireAuth />,
      children: [
        {
          path: "/profile",
          element: <ProfilePage />,
        },
        {
          path: "/profile/update",
          element: <ProfileUpdatePage />,
        },
        {
          path: "/add",
          element: <NewTeamPage />,
        },
      ],
    },
    {
      path: "/",
      element: <RequireAdmin />,
      children: [
        {
          path: "/add/game",
          element: <NewGamePage />,
        },
        {
          path: "/admin/team/list",
          element: <AdminTeamListPage />,
          loader: listPageLoader,
        },
        {
          path: "/admin/game/list",
          element: <AdminGames />,
          loader: listPageLoader,
        },
        {
          path: "/admin/game/:id",
          element: <AdminGameDetail />,
        },
        {
          path: "/admin/profile",
          element: <AdminProfilePage />,
        },
        {
          path: "/admin",
          element: <AdminPage />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
