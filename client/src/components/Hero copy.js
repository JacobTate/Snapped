import React, { Component } from "react";

import Tags from "./Tags/Tags";
import clickTags from "../tags.json"

//const Hero = () => (
class Hero extends Component {

  state = {
    clickTags
  };

  render() {
    return (
      <form>
        {/* </form><div className="text-center hero my-5"> */}
        <div className="containe">
          {/* <img className="mb-3 app-logo" src={logo} alt="React logo" width="120" /> */}
          {/* <h1 className="mb-4">React.js Sample Project</h1> */}
          <h1 className="mb-3">Enter your Search Criteria</h1>
          <input className="form-group" type='text'
          // <button className="btn btn-link search-btn"> </button>
          />

          {/* <div className="row"> */}

            {/* <i className="far fa-tag"></i> */}

            {this.state.clickTags.map(clickTags => (
              // <div className="row">
              <Tags
                myClick={this.myClick}
                id={clickTags.id}
                key={clickTags.id}
                name={clickTags.name}
                type={clickTags.type}
              />
              // </div>
            ))}

          {/* </div> */}
        </div>

      </form>
    );
    //);
  };
};

export default Hero;
