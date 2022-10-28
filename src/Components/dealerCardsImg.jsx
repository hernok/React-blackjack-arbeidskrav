import React from "react";
import {Layout} from "./Layout-components";
import "../App.css";

const DealerCardsImg = ({dealerHand}) => {
	let dealerCardsImg = [];
	dealerHand.forEach((card) => {
		dealerCardsImg.push(
			<img
				src={card.image}
				className="cards"
				height="200px"
				width=" auto;"
				key={dealerCardsImg.length}
				alt={"Your card"}
			/>
		);
		//console.log("Dealer Card Image", card);
	});
	return (
		<div>
			<Layout>{dealerCardsImg}</Layout>
		</div>
	);
};
export default DealerCardsImg;
