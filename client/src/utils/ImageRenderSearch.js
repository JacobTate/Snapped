import React, { Component } from "react";

import { Row, Col } from "reactstrap";
import ImageCard from "../components/searchResultsCard";
import axios from "axios";

class ImageRenderSearch extends Component {

  constructor(props) {
    super(props);
    this.state = {
      filePathArr: [],
      isLoaded: false,
    };
  }

  getMyImages = (images) => {
    return (
      <div className="next-steps my-5">
          <Row className="d-flex justify-content-between align-items-between flex-wrap-wrap">
          {images.map((image) => (
            <Col md={2} className="mb-4">
              <ImageCard image={image} tag={image.tag} />
            </Col>
          ))}
          </Row>
      </div>
    );
  };

  componentDidMount() {
    // var isArr = Array.isArray(this.props.searchTags);
    // console.log("ImageRenderSearch isArr: " + isArr)
    
    axios.post("/api/searchresults", {
      searchTags: this.props.searchTags
    });
    axios("/api/show/searchresults").then((res) => {
      const imgArr = [];
      
      for (let i = 0; i < res.data.files.length; i++) {
        imgArr.push(res.data.files[i].filename);
      }
      this.setState({
        filePathArr: imgArr,
        isLoaded: true
        });
    });
  }
  render() {
    return (
      <div>
        {this.state.isLoaded ? this.getMyImages(this.state.filePathArr) : null}
      </div>
    );
  }
}

export default ImageRenderSearch;
