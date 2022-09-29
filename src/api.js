import axios from "axios";
import React, {useState} from "react";

const api = axios.create({
	baseURL: "https://deckofcardsapi.com/api/deck/",
});

// Requests create deck from api
export const createStack = async () => {
	const {data} = await api.get("new/shuffle/", {
		params: {
			stack_count: 1,
		},
	});
	console.log(data);
	// Requests a card from requested deck
	const {deck_id: deckId} = data;
	const cardRes = await DrawCard(deckId);
	return cardRes;
};

async function DrawCard(deckId) {
	const {data} = await api.get(`${deckId}/draw/`, {
		//pushes into new array, named cards[]
		params: {
			count: 2,
		},
	});
	const {cards} = data;
	//cards[] displays the new card array
	const {value, image} = cards[0];
	return {deckId, value, image};
}


export default DrawCard;
