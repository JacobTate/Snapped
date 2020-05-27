import React, { Component } from "react";
import { Row, Col } from "reactstrap";
import ImageCard from "../components/savedImageCard";
import axios from "axios";

class ImageRenderSaved extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     filePathArr: [],
  //     isLoaded: false,
  //     userEmail: props.userEmail,
  //   };
  // }
  constructor(props) {
    super(props);
    this.state = {
      filePathArr: [],
      imageIdArr: [],
      isLoaded: false,
      userEmail: props.userEmail,
      isSavedImageArr: [],
    };
  }

  getMyImages = (images) => {
    return (
      <div className="next-steps my-5">
          <Row className="d-flex justify-content-between align-items-between flex-wrap-wrap">
            {/* {images.map((image, i) => (
              <Col key={i} md={2} className="mb-4">
                <ImageCard key={i} image={image} tag={image.tag} />
              </Col>
            ))} */}

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
    console.log("userEmail ImageRenderSaved: " + this.props.userEmail)
    
    axios.post("/api/saved", {
      userEmail: this.props.userEmail
    });
    
    axios("/api/show/saved")
    .then(res => {
      const imgArr = [];
      const fileIdArr = [];
      const savedImageArr = [];
      console.log("data ImageRenderSearch: " + JSON.stringify(res.data)) //TODO:
      console.log("files Count: " + res.data.files.length)
      //console.log("userSavedImages Count: " + res.data.userSavedImages[0])
      
      if(res.data.files) {
        for (let i = 0; i < res.data.files.length; i++) {
        imgArr.push(res.data.files[i].filename);
        fileIdArr.push(res.data.files[i]._id);
        }
      }
      this.setState({
        filePathArr: imgArr,
        imageIdArr: fileIdArr,
        isSavedImageArr: savedImageArr,
        isLoaded: true,  
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

export default ImageRenderSaved;
