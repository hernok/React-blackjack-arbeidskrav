/*

import React, {useState, useContext, createContext} from "react";
import {PlayerScore, PlayerScoreContext} from "./playerScore";

const dealerScore = [];

export const DealerScore = ({dealerHand}) => {
	let scoreArr = [];
	dealerHand.forEach((card) => {
		if (
			card.value === "QUEEN" ||
			card.value === "KING" ||
			card.value === "JACK"
		) {
			card.value = 10;
		} else if (card.value === "ACE") {
			card.value = 11;
		} else {
			card.value = parseInt(card.value);
		}
		scoreArr.push(card.value);
		// console.log("dealerScore:", dealerScore);
	});
	//console.log("total dealer score from component", totalDealerScore);
	const totalDealerScore = scoreArr.reduce(
		(previousValue, currentValue) => previousValue + currentValue,
		0
	);

	return (
		<div>
			<h3>Score: {totalDealerScore}</h3>
		</div>
	);
};

export const DealerScoreContext = createContext(dealerScore);

/*

		

*/
