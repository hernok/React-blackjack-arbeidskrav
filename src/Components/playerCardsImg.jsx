import React from "react";
import {Layout} from "./Layout-components";
import "../App.css";

const PlayerCardsImg = ({playerHand}) => {
	let playerCardsImg = [];
	playerHand.forEach((card) => {
		playerCardsImg.push(
			<img
				src={card.image}
				className="cards"
				height="200px"
				width=" auto;"
				key={playerCardsImg.length}
				alt={"Your card"}
			/>
		);
		//console.log("Dealer Card Image", card);
	});
	return (
		<div>
			<Layout>{playerCardsImg}</Layout>
		</div>
	);
};
export default PlayerCardsImg;
