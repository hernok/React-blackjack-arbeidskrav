//import cards from "./deck.json";
import React from "react";
import {Header} from "./Components/Layout-components";
import BlackjackTable from "./Components/blackjackTable";
import "./App.css";


export const App = () => {
	return (
		<div className="App">
			<Header>Blackjack</Header>
			<BlackjackTable />
		</div>
	);
};
