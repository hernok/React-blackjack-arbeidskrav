import {render, screen} from "@testing-library/react";
import App from "./App";
  

test("parse length of deck", () => {
	render(<App />);
	const deckOfCardsLength = screen.getByDisplayValue("deckOfCards");
	expect(deckOfCardsLength.length).toBeGreaterThan(1);
});
