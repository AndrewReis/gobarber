import styled, { keyframes } from 'styled-components'
import { shade } from 'polished'

import background from '../../assets/sign-up-background.png'

export const Container = styled.div`
	height: 100vh;
	display: flex;
`;

export const Content = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;

	width: 100%;
	max-width: 700px;
`;

const animationFromRight = keyframes`
	from {
		opacity: 0;
		transform: translateX(50px);
	}
	to {
		opacity: 1;
		transform: translateX(0px);
	}
`;

export const AnimationContent = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;

		form {
			width: 300px;
			margin: 80px 0%;
			text-align: center;

				h1 {
					margin-bottom: 24px;
				}
		}

	> a {
			color: #f4ede8;
			display: flex;
			align-items: center;
			justify-content: center;
			margin-top: 24px;
			text-decoration: none;
			transition: color 0.2s;

			svg {
				margin-right: 16px;
			}

			&:hover {
				color: ${shade(0.2, '#f4ede8')};
			}
		}
	animation: ${animationFromRight} 1s;
`;

export const Background = styled.div`
	flex: 1;
	background: url(${background}) no-repeat center;
	background-size: cover; 
	
`;