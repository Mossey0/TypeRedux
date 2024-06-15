import "./App.css";
import { Route, Routes } from "react-router";
import Home from "./components/Home";
import TypeTest from "./components/TypeTest";

function App() {
	return (
		<>
			<Routes>
				<Route
					path="/"
					element={<Home />}
				></Route>
				<Route
					path="/typeTest"
					element={<TypeTest />}
				/>
			</Routes>
		</>
	);
}
export default App;
