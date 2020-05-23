import React, { Component } from "react";
import {Button} from 'reactstrap';
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Select from 'react-select';
//import Tags from "./Tags/Tags";
//import clickTags from "../tags.json"
//import BuildSearchTags from "../utils/BuildSearchTags"

//import {Link} from 'react-router-dom'; //TODO:
import history from "../utils/history"; //TODO:
import axios from "axios";

const searchIcon = 'fa fa-search fa-2x m-0';

class Hero extends Component {

  componentDidMount () {
    axios.get("/api/getAllTags").then(res => {
        //console.log(res);
        this.setState({allTagsArr: res.data});
    });
  };

  state = {
    selectedOption: null,
  }
  handleChange = (selectedOption) => {
    this.setState({ selectedOption });
    console.log(`Option selected:`, selectedOption);
    //console.log('state: ' + JSON.stringify(this.state))
  }

  render() {
    const { selectedOption } = this.state;
    return (
      <form>
       {/* <form action="/searchresults" method="POST"> */}
          <div className="app">
            <div className="container search">
              <Select
              isMulti
              value={selectedOption}
              onChange={this.handleChange}
              // options={tagArray}
              options={this.state.allTagsArr}
              />    
            </div>
    
            <Button
              id="searchBtn"
              type="submit"
              className={searchIcon}

              onClick={() =>
                history.push("/searchresults", {
                  location: {selectedOption}
                })
              }
            >
            </Button>
          </div>
      </form>
    );
  };
};

export default Hero;
