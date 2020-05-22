import React, {Component} from "react";
import axios from "axios";
import {Button} from "reactstrap";
import TagSelect from "./AactivityTagsSelect";
class ModalForm extends Component {
constructor(props){
    super(props);
    this.state = {
    imageId: ""
    };
};
componentDidMount(){
    this.setState({imageId: this.props.imageId});
};
handleSubmit = (imageId) => {
axios.post("/api/imageId", {
    imageId
});
};
render () {
    return(
        <form >
         <TagSelect />
         <Button onClick={() => this.handleSubmit(this.props.imageId)} type="submit" color="primary" >Add Tag</Button>
        </form>
    );
};
};
export default ModalForm;