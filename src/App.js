import "./App.css";
import { BrowserRouter as Router, Routes } from "react-router-dom";
import { Home } from "./screens/Home";
import { Route } from "react-router-dom/dist";
import Welcome from "./screens/Welcome";
import Explore from "./screens/Explore";
import { RoutePageLayout } from "./router/RoutePageLayout";
import { Lilypad } from "./screens/Lilypad";

function App() {
	return (
		<Router>
			<Routes>
				<Route index exact element={<Home />} />
				<Route element={<RoutePageLayout />}>
					<Route path="Explore" exact element={<Explore />} />
					<Route path="lilypad" exact element={<Lilypad />} />
				</Route>
				<Route>
					<Route path="welcome" exact element={<Welcome />} />
				</Route>
			</Routes>
		</Router>
	);
}

export default App;
