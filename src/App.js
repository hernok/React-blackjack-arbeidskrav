//import cards from "./deck.json";
import React, {useState, useEffect} from "react";
import {Header, Layout} from "./Components/Layout-components";
import BlackjackTable from "./Components/blackjackTable";
import "./App.css";


export const App = () => {
	// useEffect(() => {
	// 	ImportCards();
	// }, []);

	return (
		<div className="App">
			<Header>Blackjack</Header>
			<BlackjackTable />
		</div>
	);
};
