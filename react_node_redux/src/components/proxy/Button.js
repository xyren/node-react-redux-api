import React  from 'react'

const Button = (props) => {
	return (
		<button type="button" className="btn" {...props}>
			<i className={props.icon}></i>
			&nbsp;
			{props.text}

		</button>
	)
}
export default Button