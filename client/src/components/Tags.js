import React from "react";
// import "./Tags.css";

const Tags = props => (

			<div onClick={() => props.myClick(props.id)} className="card col-md-12">
				<div className="img-container">
					{/* <img alt={props.name} src={props.image} /> */}
                    <p>{props.name}</p>
				</div>
			</div>
);

export default Tags;