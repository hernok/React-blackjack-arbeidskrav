//import cards from "./deck.json";
import React from "react";
import {Header, Layout} from "./Layout-components";
import BlackjackTable from "./Components/blackjackTable";

function App() {
	
	return (
		<div className="App">
			<Header>Blackjack</Header>
			<Layout>
				<BlackjackTable />
			</Layout>
		</div>
	);
}

export default App;
