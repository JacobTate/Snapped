import React, {Component} from "react";
import { Container, Row, Col } from "reactstrap";
 import axios from "axios";
// import {
//   Card, Button, CardImg, CardTitle, CardText, CardDeck,
//   CardSubtitle, CardBody
// } from 'reactstrap';
import Loading from "../components/Loading";
import { useAuth0 } from "../react-auth0-spa";
import ImageRender from "../utils/ImageRender";

//class MySnapps extends Component {
  const MySnapps = function () {
  const { loading, user } = useAuth0();
  
    return (
      <Container>
            <form action="/upload" method="POST" encType="multipart/form-data">
            <p className="lead text-muted">{user.email}</p>
            <input type="hidden" name="userEmail" value={user.email} 
                        useRef={user.email} />
              <div className="custom-file mb-3">
                <input accept="image/x-png,image/gif,image/jpeg" type="file" name="file" id="file" className="custom-file-input"></input>
                <label htmlFor="file" className="custom-file-label">Choose File</label>
              </div>
              <input type="submit" value="Submit" className="btn btn-primary btn-block"></input>
            </form>
        
        <ImageRender userEmail={user.email}/>    
      
      </Container>
      
    );
  }


export default MySnapps;
