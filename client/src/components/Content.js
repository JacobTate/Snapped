import React, { Component } from "react";

import { Row, Col } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import contentData from "../utils/contentData";
import ImageCard from "../components/ImageCard"
import ImageData from "../utils/ImageData"

class Content extends Component {
  render() {
    return (
      <div className="next-steps my-5">
        {/* <h2 className="my-5 text-center">What can I do next?</h2> */}
        <Row className="d-flex justify-content-between">
          {ImageData.map((image, i) => (
            <Col key={i} md={2} className="mb-4">
              <ImageCard image={image.link} tag={image.tag} />
            </Col>
          ))}
        </Row>
      </div>
    );
  }
}

export default Content;
