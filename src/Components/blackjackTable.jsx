import React, {useEffect, useState} from "react";
import {CardStyle} from "../Layout-components";
import DrawCard, {createStack} from "../api";
import ActionButtons from "./actionButtons.jsx";

export const HandValues = async () => {
	const [dealerHand, setDealerHand] = useState([]);
	const [playerHand, setPlayerHand] = useState([]);
	const [cardImageUrl, setCardImageUrl] = useState(null);
	const [cardValue, setCardValue] = useState(null);
	const [deckId, setDeckId] = useState(null);

	//Pushes a new card into the dealers hand
	const pushDealerHand = () => {
		const {deckId, value, image} = createStack();
		dealerHand.push(DrawCard(deckId));
		console.log(dealerHand);
	};

	//Pushes a new card into the players hand
	const pushPlayerHand = () => {
		const {deckId, value, image} = createStack();
		playerHand.push(DrawCard(deckId));
		console.log(playerHand);
	};
	pushDealerHand();
	pushPlayerHand();
};

class BlackjackTable extends React.Component {
	state = {
		cardImageUrl: null,
		cardValue: null,
		deckId: null,
		dealerHand: null,
		playerHand: null,
	};
	//bruk useEffect
	componentDidMount = async () => {
		const {deckId, value, image} = await createStack();
		this.setState({
			deckId,
			cardValue: value,
			cardImageUrl: image,
		});
	};

	onButtonClick = async ({target: {name: action}}) => {
		const {deckId, value: previousValue} = this.state;
		console.log("This.state", this.state);
		await DrawCard(deckId);
		console.log(action);
	};

	render() {
		return (
			<div>
				<CardStyle>
					<img
						src={this.state.cardImageUrl}
						alt="This is one of the players cards"
					/>
					<ActionButtons />
				</CardStyle>
				<CardStyle>
					<img
						src={this.state.cardImageUrl}
						alt="This is one of the players cards"
					/>
					<ActionButtons />
				</CardStyle>
			</div>
		);
	}
}

/*

const [dealerHand, setDealeHand] = useState(0);
const [playerHand, setPlayerHand] = useState(0);
return console.log("Hei");

*/
export default BlackjackTable;
