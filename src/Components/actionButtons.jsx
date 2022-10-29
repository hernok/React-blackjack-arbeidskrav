import React from "react";
import styled from "styled-components";

const ButtonWrapper = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-top: 32px;
`;

const ActionButtons = ({
	handleHit,
	handleStay,
	handleReset,
	handleBegin,
	toggleHitBtn,
	toggleBeginBtn,
	toggleResetBtn,
	toggleStayBtn,
}) => {
	return (
		<div>
			<ButtonWrapper>
				<button name="hit" disabled={toggleHitBtn} onClick={() => handleHit()}>
					Hit
				</button>

				<button
					name="stay"
					disabled={toggleStayBtn}
					onClick={() => handleStay()}
				>
					Stay
				</button>
				<button
					name="reset"
					disabled={toggleResetBtn}
					onClick={() => handleReset()}
				>
					Reset
				</button>
				<button
					name="begin"
					disabled={toggleBeginBtn}
					onClick={() => handleBegin()}
				>
					Begin
				</button>
			</ButtonWrapper>
		</div>
	);
};

export default ActionButtons;
