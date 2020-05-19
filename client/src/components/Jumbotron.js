// import React from "react";
// ​
// function Jumbotron({ children }) {
//   return <div className="jumbotron mt-4">{children}</div>;
// }
// ​
// export default Jumbotron;

import React, { Component } from 'react';
import jumbotron from "../assets/homeImageCrop.png";
export default class Header extends Component {
  render() {
    return (
      <div className="row">
        <div className="jumbotron">
          <img src={jumbotron} width="100%" height="" />
        </div>
      </div>
    );
  }
} 