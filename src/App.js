import "./App.css";
import { BrowserRouter as Router, Routes } from "react-router-dom";
import { Route } from "react-router-dom/dist";
import Welcome from "./screens/Welcome";
import Explore from "./screens/Explore";
import { RoutePageLayout } from "./router/RoutePageLayout";
import { Lilypad } from "./screens/Lilypad";
import Modules from "./screens/Modules";

function App() {
	return (
		<Router>
			<Routes>
				<Route element={<RoutePageLayout />}>
					<Route path="welcome" exact element={<Welcome />} />
					<Route path="" exact element={<Explore />} />
					<Route path="playground" exact element={<Lilypad />} />
					<Route path="module" exact element={<Modules />} />
				</Route>
			</Routes>
		</Router>
	);
}

export default App;
