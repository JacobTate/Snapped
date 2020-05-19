import React from "react";
import "./Tags.css";

const Tags = props => (

	// <div className="img-container">
			// <div onClick={() => props.myClick(props.id)} className="card col-md-4">
			<div onClick={() => props.myClick(props.id)}>
				{/* <div className="img-container"> */}
					{/* <img alt={props.name} src={props.image} /> */}
                    {/* <p>{props.name}</p> */}
					{props.name}
				{/* </div> */}
			</div>
	// </div>
);

export default Tags;