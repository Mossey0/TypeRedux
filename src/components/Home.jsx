import React from "react";
import { Link, useNavigate } from "react-router-dom";
import WebsiteName from "./WebsiteName";

function Home() {
	const navigate = useNavigate();
	return (
		<div className="container homepage">
			<WebsiteName />
			<div className="flex">
				<h2 className="homepage--header">Click to Start</h2>
				<button
					type="homepage--button"
					onClick={() => navigate("typeTest")}
				>
					Start
				</button>
			</div>
		</div>
	);
}

export default Home;
