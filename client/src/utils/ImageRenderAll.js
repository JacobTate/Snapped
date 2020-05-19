import React, { Component } from "react";

import { Row, Col } from "reactstrap";
import ImageCard from "../components/allImageCard";
// import "./index.css";

import axios from "axios";
import {
  Card,
  Button,
  CardImg,
  CardTitle,
  CardText,
  CardDeck,
  CardSubtitle,
  CardBody,
} from "reactstrap";

class ImageRender extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filePathArr: [],
      isLoaded: false,
      userEmail: props.userEmail,
    };
  }

  getMyImages = (images) => {
    return (
      // <div>{
      //   images.map(image => (
      //     <Card>
      //       <CardImg top width="100%" src={image} alt="Card image cap" />
      //       <CardBody>
      //           <a href={image} className="btn btn-primary" download>Download</a>
      //           <a href={image} className="btn btn-primary" delete>Delete</a>
      //           <a href={image} className="btn btn-primary" tag>Tag</a>
      //       </CardBody>
      //     </Card>
      //   ))
      // }</div>

      <div className="next-steps my-5">
          <Row className="d-flex justify-content-between align-items-between flex-wrap-wrap">
        
          {images.map((image) => (
            <Col md={2} className="mb-4">
              <ImageCard image={image} tag={image.tag} />

              {/* <CardImg top width="100%" src={image} alt="Card image cap" /> */}
              {/* <CardBody>
                <a href={image} className="btn btn-primary" download>
                  Download
                </a>
              </CardBody> */}
            </Col>
          ))}
          </Row>
      </div>
    );
  };

  componentDidMount() {
    // axios.post("/api/myimages", {
    //   userEmail: this.state.userEmail,
    // });

    axios("/mysnapps/api/showAll")
    .then(res => {
      console.log(res);
      const imgArr = [];
      for (let i = 0; i < res.data.files.length; i++) {
      imgArr.push(res.data.files[i].filename);
      }
      this.setState({
        filePathArr: imgArr,
        isLoaded: true
        });
    });

    console.log("where are we");

    // axios("/api/show/myimages").then((res) => {
    //   console.log("res: " + res);
    //   const imgArr = [];

    //   for (let i = 0; i < res.data.files.length; i++) {
    //     imgArr.push(res.data.files[i].filename);
    //   }

    //   this.setState({
    //     filePathArr: imgArr,
    //     isLoaded: true,
    //   });
    // });
  }
  render() {
    return (
      <div>
        {this.state.isLoaded ? this.getMyImages(this.state.filePathArr) : null}
      </div>
    );
  }
}

export default ImageRender;
