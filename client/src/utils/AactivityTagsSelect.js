import React, {Component} from "react";
import axios from "axios";
class TagSelect extends Component {
constructor (props) {
    super(props);
    this.state = {
        tagsArr: []
    }
};

  componentDidMount () {
    axios.get("/api/getTags").then(res => {
        console.log(res);
        this.setState({tagsArr: res.data});
      });
  };
  handleClick = (event) => {
      console.log(event.target.value);
      axios.post("/api/tags/addImage", {
          tag: event.target.value
      });
  };
  render () {
      return (
      <select className="activityTagSelect" onChange={this.handleClick} required>
          <option className="activityTagDefaultOption" value="">Select a tag</option>
      {    
          this.state.tagsArr.map((tag, i) => (
          <option className="activityTagOption" value={tag} key={i}>{tag}</option>
          ))}
          </select>
      );
  }
};
export default TagSelect;