import React, { Component } from "react";
import {Button} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Select from 'react-select';
import Tags from "./Tags/Tags";
import clickTags from "../tags.json"

const searchIcon = 'fa fa-search fa-2x m-0';
const tagArray = [];

clickTags.map(clickTags => {
  tagArray.push({"label": clickTags.name, "value": clickTags.id})
})

console.log("tagArray: " + JSON.stringify(tagArray))

//const Hero = () => (
class Hero extends Component {

  // state = {
  //   clickTags
  // };

  state = {
    selectedOption: null,
  }
  handleChange = (selectedOption) => {
    this.setState({ selectedOption });
    console.log(`Option selected:`, selectedOption);
  }

  render() {
    const { selectedOption } = this.state;
    return (
      <form>
          <div className="app">
            <div className="container search">
              <Select
              isMulti
              value={selectedOption}
              onChange={this.handleChange}
              options={tagArray}
              />    
            </div>
    
            <Button
              id="searchBtn"
              className={searchIcon}
              href='/saved'
            >
            </Button>
          </div>
      </form>
    );
  };
};

export default Hero;
