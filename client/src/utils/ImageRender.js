import React, {Component} from "react";
import axios from "axios";
import {
    Card, Button, CardImg, CardTitle, CardText, CardDeck,
    CardSubtitle, CardBody
  } from 'reactstrap';
  class ImageRender extends Component {
    constructor (props) {
    super(props);
    this.state = {
      filePathArr: [],
      isLoaded: false,
      userEmail: props.userEmail
    }
  }
  
  getMyImages = (images) => {
    return(
    <div>{
      images.map(image => (
        <Card>
          <CardImg top width="100%" src={image} alt="Card image cap" />
          <CardBody>
              <a href={image} className="btn btn-primary" download>Download</a>
          </CardBody>
        </Card>
      ))
    }</div>
    )
  };
  
  componentDidMount () {
     
       axios.post("/api/myimages", {
    userEmail: this.state.userEmail
  });
      
    // axios("/mysnapps/api/showAll")
    // .then(res => {
    //   console.log(res);
    //   const imgArr = [];
    //   for (let i = 0; i < res.data.files.length; i++) {
    //   imgArr.push(res.data.files[i].filename);
    //   }
    //   this.setState({
    //     filePathArr: imgArr,
    //     isLoaded: true
    //     });
    // });
    axios("/api/show/myimages")
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
  render () {
      return (
        <div>{
            this.state.isLoaded ? this.getMyImages(this.state.filePathArr): null
          }</div>
      );
  }
  };
  export default ImageRender;