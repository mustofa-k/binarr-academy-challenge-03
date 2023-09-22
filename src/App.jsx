import { createBrowserRouter, RouterProvider } from "react-router-dom";

import HomePage from "./pages/HomePage.jsx";
import AddPage from "./pages/AddPage.jsx";
import EditPage from "./pages/EditPage.jsx";

const routes = createBrowserRouter([
	{
		path: "/",
		element: <HomePage />,
	},
	{
		path: "/new",
		element: <AddPage />,
	},
	{
		path: "/:id/edit",
		element: <EditPage />,
	},
]);
const App = () => {
	return <RouterProvider router={routes} />;
};

export default App;