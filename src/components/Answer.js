import React from 'react'

export default function Answer({ text }) {

	return (
		<div style={{ backgroundColor: 'red' }}>
			<div className="textAnswer">{text}</div>
		</div >
	)
}
