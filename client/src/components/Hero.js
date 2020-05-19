import React, { Component } from "react";
import Select from 'react-select';
import Tags from "./Tags/Tags";
import clickTags from "../tags.json"

const scaryAnimals = [
  { label: "Alligators", value: 1 },
  { label: "Crocodiles", value: 2 },
  { label: "Sharks", value: 3 },
  { label: "Small crocodiles", value: 4 },
  { label: "Smallest crocodiles", value: 5 },
  { label: "Snakes", value: 6 },
];

const tagArray = [];

clickTags.map(clickTags => {
  tagArray.push({"label": clickTags.name, "value": clickTags.id})
})

console.log("tagArray: " + JSON.stringify(tagArray))

  //{this.state.clickTags.map(clickTags => (
    // <Tags
    //   myClick={this.myClick}
    //   id={clickTags.id}
    //   key={clickTags.id}
    //   name={clickTags.name}
    //   type={clickTags.type}
    // />
  //))};

//const Hero = () => (
class Hero extends Component {

  state = {
    clickTags
  };

  render() {
    return (
      <form>
        {/* </form><div className="text-center hero my-5"> */}
        <div className="container">
          {/* <img className="mb-3 app-logo" src={logo} alt="React logo" width="120" /> */}
          {/* <h1 className="mb-4">React.js Sample Project</h1> */}
          <h1 className="mb-3">Enter your Search Criteria</h1>
          <input className="form-group" type='text'
          // <button className="btn btn-link search-btn"> </button>
          />

          <div className="app">
            <div className="container search">
              <Select options={tagArray} isMulti />
            </div>
          </div>

    
        </div>

      </form>
    );
    //);
  };
};

export default Hero;
