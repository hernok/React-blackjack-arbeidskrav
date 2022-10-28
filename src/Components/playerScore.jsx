
/*
import React, {useState, createContext} from "react";
import {useEffect} from "react";
import {renderIntoDocument} from "react-dom/test-utils";
import {DealerScore, DealerScoreContext} from "./dealerScore";

const playerScore = [];
export const PlayerScoreContext = createContext(playerScore);

export const PlayerScore = ({playerHand, playerScore}) => {
	let scoreArr = [];
	let totalDealerScore = 20;

	playerHand.forEach((card) => {
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
		// return () => {
		// 	setPScore((oldScore) => [...oldScore, card.value]);
		// };
	});

	const totalPlayerScore = scoreArr.reduce(
		(previousValue, currentValue) => previousValue + currentValue,
		0
		);
		
		
	if (totalPlayerScore > 21) {
		return (
			<div>
				<h3>YOU LOSE!</h3>
			</div>
		);
	} else if (totalDealerScore > 21 || totalDealerScore < totalPlayerScore) {
		return (
			<div>
				<h3>YOU WIN!</h3>
			</div>
		);
	} else {
		return (
			<div>
				<h3>Score: {totalPlayerScore}</h3>
			</div>
		);
	}
};
*/
//export const PlayerScoreContext = createContext(playerScore);

//<PlayerContext.Provider>blackjackTable</PlayerContext.Provider>
//export const ScoreContext = createContext<
/*		
		
*/
