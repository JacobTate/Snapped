import React, {Component} from "react";
import axios from "axios";
import {Button} from "reactstrap";
import TagSelect from "./AactivityTagsSelect";
class ModalForm extends Component {
constructor(props){
    super(props);
    this.state = {
    };
};
handleSubmit = (imageId) => {
axios.post("/api/imageId", {
    imageId
});
};
defaultOption = () => {
    return(
        <option value="">Select a tag</option>
    );
};
render () {
    return(
        <div >
        <TagSelect on defaultOption={this.defaultOption.bind(this)}/>
         <Button onClick={ () => {this.handleSubmit(this.props.imageId); this.props.getTags(this.props.imageId);}} type="submit" color="primary" >Add Tag</Button>
        </div>
    );
};
};
export default ModalForm;