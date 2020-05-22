import React, { Component } from "react";
import { Row, Col, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import ImageCard from "../components/myImageCard";
import axios from "axios";

class ImageRender extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filePathArr: [],
      imageIdArr: [],
      isLoaded: false,
      userEmail: props.userEmail,
    };
  }

  getMyImages = (images) => {
    return (
      <div className="next-steps my-5">
          <Row className="d-flex justify-content-between align-items-between flex-wrap-wrap">
        
          {images.map((image, i) => (
            <Col key={i} md={2} className="mb-4">
              <ImageCard thisImage={this.state.imageIdArr[i]} key={i} image={image} tag={image.tag}  />
            </Col>
          ))}
          </Row>
      </div>
    );
  };

  isModalOpen = () => {
  this.state.isModalOpen ? this.setState({isModalOpen: false}): this.setState({isModalOpen: true});
  };
  componentDidMount() {
    axios.post("/api/myimages", {
      userEmail: this.state.userEmail,
    });
    axios("/api/show/myimages").then((res) => {
      console.log(res);
      const imgArr = [];
      const fileIdArr = [];

      for (let i = 0; i < res.data.files.length; i++) {
        imgArr.push(res.data.files[i].filename);
        fileIdArr.push(res.data.files[i]._id);
      };

      this.setState({
        filePathArr: imgArr,
        imageIdArr: fileIdArr,
        isLoaded: true,
      });
    });
  };
  render() {
    return (
      <div>
        {this.state.isLoaded ? this.getMyImages(this.state.filePathArr) : null}
      </div>
    );
  };
};

export default ImageRender;
