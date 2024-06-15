import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

function Input({ currentQuote, fetch }) {
	const navigate = useNavigate();
	const [input, setInput] = useState("");
	const [focus, setFocus] = useState(false);
	const inputRef = useRef(null);
	const displayRef = useRef(null);
	const [winCondition, setWinCondition] = useState(false);
	const splitQuote = currentQuote.split("");
	const [errors, setErrors] = useState(0);

	// Scroll behavior while typing and error checking
	useEffect(() => {
		const InputErrorCount = input.split("").filter((item, index) => {
			return item !== splitQuote[index];
		}).length;
		setErrors(InputErrorCount);

		if (displayRef.current) {
			const inputLength = input.length;
			const displayHeight = displayRef.current.clientHeight;
			const totalHeight = displayRef.current.scrollHeight;
			const scrollHeight =
				(totalHeight - displayHeight) * (inputLength / currentQuote.length);
			displayRef.current.scrollTop = scrollHeight;
		}
	}, [input]);

	useEffect(() => {
		if (focus) {
			inputRef.current.focus();
		} else {
			inputRef.current.blur();
		}
	}, [focus]);

	const handleInputChange = (e) => {
		const value = e.target.value;
		setInput(value);
		if (currentQuote === value) {
			setWinCondition(true);
		}
	};

	const handleFocus = (bool) => {
		if (bool) {
			setFocus(true);
		} else {
			setFocus(false);
		}
	};

	const handleNextQuote = () => {
		setInput("");
		setWinCondition(false);
		fetch();
	};

	const handleHome = () => {
		navigate("/");
	};

	// DisplayQuote on screen
	const displayQuote = splitQuote.map((char, index) => {
		let color;
		const cursor = <span className="cursor">|</span>;
		if (index + 1 <= input.length) {
			color = char === input[index] ? "correct relative" : "incorrect relative";
			if (input[index] !== " " && char === " ") {
				char = "_";
			}
		} else {
			color = "inactive relative";
		}

		return (
			<span
				key={index}
				className={color}
			>
				{char}
				{input.length - 1 === index && cursor}
			</span>
		);
	});

	return (
		<div className="relative flex">
			<div>
				<span>Errors:{errors} </span>
				<span></span>
				<span></span>
			</div>
			<div
				className="input-box"
				onMouseEnter={() => handleFocus(true)}
				onMouseLeave={() => handleFocus(false)}
			>
				<p
					className={`quote-display ${focus ? "" : "blurred"}`}
					ref={displayRef}
				>
					{displayQuote}
				</p>
				<input
					className="hidden no-select"
					type="text"
					name="input-text"
					id="input-text"
					value={input}
					ref={inputRef}
					onChange={handleInputChange}
					disabled={winCondition}
				/>
				{!focus && <p className="absolute">Hover to focus</p>}
			</div>
			<div>
				<button
					className="button"
					type="button"
					onClick={() => handleNextQuote()}
				>
					Next Quote
				</button>
				<button
					className="button"
					type="button"
					onClick={() => handleHome()}
				>
					Home
				</button>
				<div>{winCondition ? "Completed" : ""}</div>
			</div>
		</div>
	);
}

export default Input;
