import "./App.css";
import { BrowserRouter as Router, Routes } from "react-router-dom";
import { Route } from "react-router-dom/dist";
import Welcome from "./screens/Welcome";
import Explore from "./screens/Explore";
import Modules from "./screens/Modules";
import { RoutePageLayout } from "./router/RoutePageLayout";
import { Lilypad } from "./screens/Lilypad";
import HistoryTable from "./components/History";

function App() {
	return (
		<Router>
			<Routes>
				<Route element={<RoutePageLayout />}>
					<Route path="/" exact element={<Explore />} />
					<Route path="playground" exact element={<Lilypad />} />
					<Route path="playground/:id" exact element={<Lilypad />} />
					<Route path="module" exact element={<Modules />} />
					<Route path="history" exact element={<HistoryTable />} />
				</Route>

				<Route path="welcome" exact element={<Welcome />} />
			</Routes>
		</Router>
	);
}

export default App;
