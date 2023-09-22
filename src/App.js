import "./App.css";
import { BrowserRouter as Router, Routes } from "react-router-dom";
import { Home } from "./screens/Home";
import { Route } from "react-router-dom/dist";
import Welcome from "./screens/Welcome";
import Explore from "./screens/Explore";
import Modules from "./screens/Modules";
import { RoutePageLayout } from "./router/RoutePageLayout";
import { Lilypad } from "./screens/Lilypad";

function App() {
	return (
		<Router>
			<Routes>
				<Route element={<RoutePageLayout />}>
					<Route path="/" exact element={<Explore />} />
					<Route path="playground" exact element={<Lilypad />} />
					<Route path="module" exact element={<Modules />} />
				</Route>

				<Route path="welcome" exact element={<Welcome />} />
			</Routes>
		</Router>
	);
}

export default App;
