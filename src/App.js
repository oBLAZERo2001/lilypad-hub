import "./App.css";
import { BrowserRouter as Router, Routes } from "react-router-dom";
import { Home } from "./screens/Home";
import { Route } from "react-router-dom/dist";
import Welcome from "./screens/Welcome";

function App() {
	return (
		<Router>
			<Routes>
				<Route index exact element={<Home />} />
				<Route path="welcome" exact element={<Welcome />} />
			</Routes>
		</Router>
	);
}

export default App;
