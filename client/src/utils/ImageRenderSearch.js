import React, { Component } from "react";
import { Row, Col } from "reactstrap";
import ImageCard from "../components/searchResultsCard";
import axios from "axios";

class ImageRenderSearch extends Component {

  state = {
    showDiv: true
  }

  constructor(props) {
    super(props);
    this.state = {
      filePathArr: [],
      imageIdArr: [],
      isLoaded: false,
      userEmail: props.userEmail,
      //userEmail: this.props.userEmail,
    };
  }

  getMyImages = (images) => {
    return (
      <div className="next-steps my-5">
          <Row className="d-flex justify-content-between align-items-between flex-wrap-wrap">
          {/* {images.map((image) => ( */}
            {/* <Col md={2} className="mb-4"> */}
              {/* <ImageCard image={image} tag={image.tag} /> */}
          {images.map((image, i) => (
            <Col key={i} md={2} className="mb-4">
              <ImageCard thisImage={this.state.imageIdArr[i]} key={i} image={image} tag={image.tag} userEmail={this.props.userEmail} thisFilePathArr={this.state.filePathArr[i]} />
            </Col>
          ))}
          </Row>
      </div>
    );
  };

  componentDidMount() {
    // var isArr = Array.isArray(this.props.searchTags);
    // console.log("ImageRenderSearch isArr: " + isArr)
    console.log("userEmail ImageRenderSearch: " + this.props.userEmail)
    axios.post("/api/searchresults", {
      searchTags: this.props.searchTags,
      userEmail: this.props.userEmail
    });
    axios("/api/show/searchresults").then((res) => {
      const imgArr = [];
      const fileIdArr = [];
      console.log("data ImageRenderSearch: " + JSON.stringify(res.data)) //TODO:
      for (let i = 0; i < res.data.files.length; i++) {
        imgArr.push(res.data.files[i].filename);
        fileIdArr.push(res.data.files[i]._id);
        console.log("fileIdArr: " + fileIdArr); //TODO:
      }
      this.setState({
        filePathArr: imgArr,
        imageIdArr: fileIdArr,
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
