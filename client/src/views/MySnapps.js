import React, {Component} from "react";
import { Container, Row, Col } from "reactstrap";
import axios from "axios";
import Highlight from "../components/Highlight";
import Loading from "../components/Loading";
import { useAuth0 } from "../react-auth0-spa";
import { highlight } from "highlight.js";

class MySnapps extends Component {
  // const { loading, user } = useAuth0();

  // if (loading || !user) {
  //   return <Loading />;
  // }
constructor (props) {
  super(props);
  this.state = {
  }
}

  render() {
  return (
    <Container>

          <form action="/upload" method="POST" encType="multipart/form-data">
          <div className="custom-file mb-3">
            <input type="file" name="file" id="file" className="custom-file-input"></input>
            <label htmlFor="file" className="custom-file-label">Choose File</label>
          </div>
          <input type="submit" value="Submit" className="btn btn-primary btn-block"></input>
        </form>
       
    </Container>
  );
  }
};

export default MySnapps;
