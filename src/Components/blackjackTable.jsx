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
	const [stay, setStay] = useState(false);
	const [toggleBeginBtn, setToggleBeginBtn] = useState(true);
	const [toggleResetBtn, setToggleResetBtn] = useState(true);
	const [toggleHitBtn, setToggleHitBtn] = useState(true);
	const [toggleStayBtn, setToggleStayBtn] = useState(true);

	// Skulle gjerne brukt useState() for disse arrayene, men jeg fikk infinite loop bugs når jeg prøvde å sette staten i if statements.
	// Klarte ikke å finne grunnen.
	// Hvis jeg hadde funnet en løsning hadde jeg greid å bruke useContext og function components for å regne ut hands.
	let results = [];
	let totDealerScore = [];
	let tempDealerScore = [];
	let totPlayerScore = [];
	let tempPlayerScore = [];

	//Loads on mount and every time the [] at the end changes value.
	useEffect(() => {
		const fetchId = async () => {
			await fetch(
				"https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"
			)
				.then((response) => response.json())
				.then((data) => setDeckId(data.deck_id));
		};
		try {
			fetchId();
		} catch (err) {
			console.error(err);
		}
	}, []);

	//Loads when the value of deckId changes.
	//Crashes when deckOfCards array no longer has any cards.
	useEffect(() => {
		const fetchCards = async () => {
			await fetch(
				`https://www.deckofcardsapi.com/api/deck/${deckId}/draw/?count=52`
			)
				.then((response) => response.json())
				.then((data) => setDeckOfCards(data.cards));
		};
		try {
			fetchCards();
		} catch (err) {
			console.error(err);
		}
	}, [deckId]);

	// Enables the begin button after the api is fetched
	useEffect(() => {
		setToggleBeginBtn(false);
	}, [deckOfCards]);

	// Runs handleStay when the player is bust to disable buttons
	useEffect(() => {
		const stayOnBust = () => {
			if (totPlayerScore > 21 && stay === false) {
				handleStay();
			}
		};
		stayOnBust();
	}, [playerHand]);

	// Deals starting hands
	const handleBegin = () => {
		setToggleResetBtn(false);
		setToggleHitBtn(false);
		setToggleStayBtn(false);
		setToggleBeginBtn(true);
		setPlayerHand([deckOfCards[0], deckOfCards[1]]);
		setDealerHand([deckOfCards[2]]);
		setDeckOfCards((oldDeck) => {
			oldDeck.splice(0, 3);
			return oldDeck;
		});
	};

	// Serves the player a card and removes the card from the deck
	const handleHit = () => {
		setPlayerHand((oldPlayerHand) => [...oldPlayerHand, deckOfCards[0]]);
		setDeckOfCards((oldDeck) => {
			oldDeck.splice(0, 1);
			return oldDeck;
		});
	};

	// Serves the dealer a card and removes the card from the deck
	const dealerDraw = () => {
		setDealerHand((oldDealerHand) => [...oldDealerHand, deckOfCards[0]]);
		setDeckOfCards((oldDeck) => {
			oldDeck.splice(0, 1);
			return oldDeck;
		});
	};

	// The stay handler, disables the hit and stay buttons as well as dealing the dealer a card
	const handleStay = () => {
		setStay(true);
		setToggleHitBtn(true);
		setToggleStayBtn(true);
	};

	// The reset handler, clears both the dealer and the players hands, and sets every button to their play stage
	const handleReset = () => {
		setPlayerHand([]);
		setDealerHand([]);

		setToggleResetBtn(true);
		setToggleHitBtn(false);
		setToggleBeginBtn(false);
		setToggleStayBtn(false);
		setStay(false);
		handleBegin();
		results = [];
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

	// Subtracts 10 points from the player score if the player has an ace and a higher score than 21
	if (totalPlayerScore > 21) {
		tempPlayerScore.forEach((value) => {
			if (value === 11) totPlayerScore = totPlayerScore - 10;
		});
	}

	// Checks if the player has not gone bust
	if (
		(totPlayerScore < totDealerScore &&
			totDealerScore <= 21 &&
			stay === true) ||
		totPlayerScore > 21
	) {
		results = "YOU LOSE!";
	} else if (
		(totDealerScore > 21 && totPlayerScore <= 21 && stay === true) ||
		(totDealerScore < totPlayerScore && stay === true && totDealerScore >= 17)
	) {
		results = "YOU WIN!";
	} else if (
		totDealerScore === totPlayerScore &&
		stay === true &&
		totPlayerScore === 21
	) {
		results = "DRAW!";
	}

	// Checks if the dealer can draw cards
	if (totDealerScore < 17 && totPlayerScore <= 21 && stay === true) {
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
				toggleResetBtn={toggleResetBtn}
				toggleStayBtn={toggleStayBtn}
				toggleHitBtn={toggleHitBtn}
				dealerDraw={dealerDraw}
			/>
			<Layout>
				<h1>{results}</h1>
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

export default BlackjackTable;
