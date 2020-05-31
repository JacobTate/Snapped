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
    axios.get("/api/find/locationTags").then(res => {
        console.log(res);
        this.setState({tagsArr: res.data});
      });
  };
  handleSubmit = (event) => {
      console.log(event.target.value);
      axios.post("/api/test/tag", {
          tag: event.target.value
      });
  }
  render () {
      return (
      <select className="locationTagSelect" onClick={this.handleSubmit} required><option className="locationTagDefaultOption" value="">{this.props.defaultText}</option>
      {    
          this.state.tagsArr.map((tag, i) => (
          <option className="locationTagOption" value={tag} key={i}>{tag}</option>
          ))}</select>
      );
  }
};
export default TagSelect;