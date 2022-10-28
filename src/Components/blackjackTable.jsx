import React, {useEffect, useState} from "react";
import {Layout} from "./Layout-components";
import PlayerCardsImg from "./playerCardsImg";
import DealerCardsImg from "./dealerCardsImg";
import ActionButtons from "./actionButtons.jsx";
import "../App.css";

function BlackjackTable() {
	const [deckId, setDeckId] = useState(null);
	const [deckOfCards, setDeckOfCards] = useState([]);
	const [dealerHand, setDealerHand] = useState([]);
	const [playerHand, setPlayerHand] = useState([]);
	const [reset, setReset] = useState(false);
	const [stay, setStay] = useState(false);
	const [toggleBeginBtn, setToggleBeginBtn] = useState(true);
	const [notStarted, setNotStarted] = useState(true);
	const [toggleHitBtn, setToggleHitBtn] = useState(true);

	let victor = [];
	let totDealerScore = [];
	let tempDealerScore = [];
	let totPlayerScore = [];
	let tempPlayerScore = [];

	//Loads on mount and every time the [] at the end changes value.
	useEffect(() => {
		fetch("https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
			.then((response) => response.json())
			.then((data) => setDeckId(data.deck_id));
	}, []);

	//Loads when the value of deckId changes.
	useEffect(() => {
		fetch(`https://www.deckofcardsapi.com/api/deck/${deckId}/draw/?count=52`)
			.then((response) => response.json())
			.then((data) => setDeckOfCards(data.cards));
	}, [deckId]);

	useEffect(() => {
		fetch("https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
			.then((response) => response.json())
			.then((data) => setDeckId(data.deck_id));
	}, [reset]);

	// Enables the begin button after the api is fetched
	useEffect(() => {
		setToggleBeginBtn(false);
	}, [deckId]);

	// Deals starting hands
	const handleBegin = () => {
		setReset(false);
		setToggleBeginBtn(true);
		setNotStarted(false);
		setToggleHitBtn(false);
		setPlayerHand([deckOfCards[0], deckOfCards[1]]);
		setDealerHand([deckOfCards[2]]);
		setDeckOfCards((oldDeck) => {
			oldDeck.splice(0, 3);
			return oldDeck;
		});
	};

	//Serves the player a card and removes the card from the deck
	const handleHit = () => {
		setPlayerHand((oldPlayerHand) => [...oldPlayerHand, deckOfCards[0]]);
		setDeckOfCards((oldDeck) => {
			oldDeck.splice(0, 1);
			return oldDeck;
		});
	};

	//Serves the dealer a card and removes the card from the deck
	const dealerDraw = () => {
		setDealerHand((oldDealerHand) => [...oldDealerHand, deckOfCards[0]]);
		setDeckOfCards((oldDeck) => {
			oldDeck.splice(0, 1);
			return oldDeck;
		});
	};

	//The stay handler, disables the hit and stay buttons as well as dealing the dealer a card
	const handleStay = () => {
		setStay(true);
		setToggleHitBtn(true);
		if (totalDealerScore < totalPlayerScore && totalDealerScore < 21) {
			dealerDraw();
		}
	};

	//The reset handler, clears both the dealer and the players hands, and sets every button to their play stage
	const handleReset = () => {
		setPlayerHand([]);
		setDealerHand([]);
		setToggleHitBtn(true);
		setToggleBeginBtn(false);
		setReset(true);
		setStay(false);
		setNotStarted(true);
		handleBegin();
		victor = [];
	};

	// Converts the playcard values to numbers and pushes them into an array
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
		tempPlayerScore.push(card.value);
	});
	// Adds up all the numbers from the previous function
	const totalPlayerScore = tempPlayerScore.reduce(
		(previousValue, currentValue) => previousValue + currentValue,
		0
	);

	// Converts the playcard values to numbers and pushes them into an array
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
		tempDealerScore.push(card.value);
	});

	// Adds up all the numbers from the previous function
	const totalDealerScore = tempDealerScore.reduce(
		(previousValue, currentValue) => previousValue + currentValue,
		0
	);

	totPlayerScore = totalPlayerScore;
	totDealerScore = totalDealerScore;

	// Checks if the player has not gone bust
	if (totPlayerScore > 21) {
		//setStay(() => true);
	} else if (
		totPlayerScore < totDealerScore &&
		totDealerScore < 21 &&
		stay === true
	) {
		//setStay(() => true);
		victor = "YOU LOSE!";
	} else if (totDealerScore > 21 && totPlayerScore <= 21 && stay === true) {
		victor = "YOU WIN!";
	} else if (totDealerScore === totPlayerScore && stay === true) {
		victor = "DRAW!";
	}
	//Checks if the dealer can draw cards
	if (
		totPlayerScore > totDealerScore &&
		totPlayerScore <= 21 &&
		stay === true
	) {
		dealerDraw();
	}

	return (
		<div>
			<ActionButtons
				handleHit={handleHit}
				handleStay={handleStay}
				handleReset={handleReset}
				handleBegin={handleBegin}
				toggleBeginBtn={toggleBeginBtn}
				notStarted={notStarted}
				toggleHitBtn={toggleHitBtn}
				dealerDraw={dealerDraw}
			/>
			<Layout>
				<h1>{victor}</h1>
			</Layout>
			<Layout>
				<h2>Dealer</h2>
			</Layout>

			<Layout>
				<h3>Score: {totDealerScore}</h3>
			</Layout>
			<Layout>
				<DealerCardsImg dealerHand={dealerHand} />
			</Layout>
			<Layout>
				<h2>Player</h2>
			</Layout>
			<Layout>
				<h3>Score: {totPlayerScore}</h3>
			</Layout>
			<Layout>
				<PlayerCardsImg playerHand={playerHand} />
			</Layout>
		</div>
	);
}
//
//<PlayerScore playerHand={playerHand} playerScore={playerScore} />
//<DealerScore dealerHand={dealerHand} dealerScore={dealerScore} />

export default BlackjackTable;
