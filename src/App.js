import "./App.css";
import { BrowserRouter as Router, Routes } from "react-router-dom";
import { Home } from "./screens/Home";
import { Route } from "react-router-dom/dist";

function App() {
	return (
		<Router>
			<Routes>
				<Route index exact element={<Home />} />
			</Routes>
		</Router>
	);
}

export default App;
