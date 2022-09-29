import React from "react";
import styled from "styled-components";
import HandValues from "./blackjackTable";

const ButtonWrapper = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-top: 32px;
`;

const ActionButton = () => (
	<ButtonWrapper>
		<button name="hit" onClick={HandValues}>
			Hit
		</button>
		<button name="stay" onClick={HandValues}>
			Stay
		</button>
	</ButtonWrapper>
);

export default ActionButton;
