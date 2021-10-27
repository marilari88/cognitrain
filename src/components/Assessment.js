import React, { useEffect, useState } from 'react'
import { ASSESSMENT_TIME } from '../constants';
import Answer from './Answer'

export default function Assessment({ assessment, showNextAssessment }) {
	const [isTimeOver, setIsTimeOver] = useState(false);
	const [timer, setTimer] = useState(ASSESSMENT_TIME);

	useEffect(() => {
		setIsTimeOver(false);
		setTimer(ASSESSMENT_TIME);
		let counter = 0;
		const timeCounter = setInterval(() => {
			counter++;
			setTimer(ASSESSMENT_TIME - counter);
			if (counter >= ASSESSMENT_TIME) {
				setIsTimeOver(true);
				clearInterval(timeCounter);
			}
		}, 1000)
		return () => {
			clearInterval(timeCounter);
		}
	}, [])

	useEffect(() => {
		const checkAnswer = (ev) => {
			const isAnswerKey = assessment.answers.find(answer => answer.key === ev.key);
			if (isAnswerKey && !isTimeOver) {
				if (isAnswerKey.rightAnswer) {
					alert("Risposta Giusta");
				} else {
					alert("Risposta Sbagliata");
				}
				showNextAssessment();
			}
		}
		window.addEventListener('keydown', checkAnswer)
		return () => {
			window.removeEventListener('keydown', checkAnswer)
		}
	}, [isTimeOver, assessment])

	return (
		<div>
			<div className="timer">{timer}</div>
			{isTimeOver && <div className="timeIsOverMessage">Tempo Scaduto</div>}
			<div className="question">{assessment.question}</div>
			{assessment.image && <img alt="personaggio da indovinare" src={assessment.image} />}
			{assessment.answers && assessment.answers.map((answer, index) => {
				return (<Answer key={index} text={answer.text} rightAnswer={answer.rightAnswer} />)
			})}
		</div>
	)
}
