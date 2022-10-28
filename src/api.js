import {useEffect, useState} from "react";

export const ImportCards = ({}) => {
	const [deckId, setDeckId] = useState(null);
	const [deckOfCards, setDeckOfCards] = useState([]);

	//Loads on mount and every time the empty array at the end changes.
	useEffect(() => {
		fetch("https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
			.then((response) => response.json())
			.then((data) => setDeckId(data.deck_id));
	}, []);
	console.log("deckId from api", deckId);
	//Loads when the value of deckId changes.
	useEffect(() => {
		fetch(`https://www.deckofcardsapi.com/api/deck/${deckId}/draw/?count=52`)
			.then((response) => response.json())
			.then((data) => setDeckOfCards(data.cards));
	}, [deckId]);
};
