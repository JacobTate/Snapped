import React, {Component} from "react";
import { Container, Row, Col } from "reactstrap";
import axios from "axios";
import {
  Card, Button, CardImg, CardTitle, CardText, CardDeck,
  CardSubtitle, CardBody
} from 'reactstrap';
// import Highlight from "../components/Highlight";
// import Loading from "../components/Loading";
// import { useAuth0 } from "../react-auth0-spa";
// import { highlight } from "highlight.js";
// import ImageCard from "../components/ImageCard";

class MySnapps extends Component {
  // const { loading, user } = useAuth0();

  // if (loading || !user) {
  //   return <Loading />;
  // }
constructor (props) {
  super(props);
  this.state = {
    filePathArr: [],
    isLoaded: false
  }
}
getMyImages = (images) => {
return(
<div>{
  images.map(image => (
    // <img key={image} src={image}>
    // </img>
    <Card>
    <CardImg top width="100%" src={image} alt="Card image cap" />
    <CardBody>
        {/* <CardTitle>Card title</CardTitle>
        <CardSubtitle>Card subtitle</CardSubtitle>
        <CardText>This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</CardText> */}
        <a href={image} className="btn btn-primary" download>Download</a>
    </CardBody>
</Card>
  ))
  }</div>
)
};
componentDidMount () {
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
}
  render() {
  return (
    <Container>
          <form action="/upload" method="POST" encType="multipart/form-data">
          <div className="custom-file mb-3">
            <input accept="image/x-png,image/gif,image/jpeg" type="file" name="file" id="file" className="custom-file-input"></input>
            <label htmlFor="file" className="custom-file-label">Choose File</label>
          </div>
          <input type="submit" value="Submit" className="btn btn-primary btn-block"></input>
        </form>
  <div>{
    this.state.isLoaded ? this.getMyImages(this.state.filePathArr): null
    }</div>
    </Container>
  );
  }
};

export default MySnapps;
