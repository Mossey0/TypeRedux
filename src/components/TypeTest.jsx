import React, { useEffect, useRef, useState } from "react";
import Input from "./Input";
import WebsiteName from "./WebsiteName";

function TypeTest() {
	const [quote, setQuote] = useState("");
	const [dataIn, setDataIn] = useState(false);

	async function fetchQuote() {
		try {
			const response = await fetch("https://api.api-ninjas.com/v1/quotes?", {
				headers: {
					"X-Api-Key": "2hecXAFXylbRkVWrRofidw==s5uYDA1R7RzeUoXR",
				},
			});
			const data = await response.json();
			setQuote(data[0].quote);
			setDataIn(true);
		} catch (error) {
			setQuote("Unable to reach server");
		}
	}

	useEffect(() => {
		if (dataIn == false) {
			fetchQuote();
		}
	}, []);

	return (
		<div className="typetest-flex container">
			<WebsiteName />
			<Input
				currentQuote={quote}
				fetch={fetchQuote}
			/>
		</div>
	);
}

export default TypeTest;
