import React, {Component} from "react";
import axios from "axios";
import {Button} from "reactstrap";
import TagSelect from "./TagSelect";
class ModalTagsDisplay extends Component {
constructor(props){
    super(props);
    this.state = {
        isRendered: false,
        aTagsArr: [],
        lTags: "",
        areTags: false
    };
};
componentDidMount(){
this.setState({
    isRendered: true
});
this.getTags(this.props.thisImage);
};
getTags = (imageId) => {
    axios.get(`/api/tags/${imageId}`)
    .then(res => {
     console.log(res);
     const aTagsArr = [];
     let lTags = res.data.lTags;
     for (let i = 0; i < res.data.aTags.length; i++) {
       aTagsArr.push(res.data.aTags[i]); 
    };
    if(aTagsArr.length > 0){
     this.setState({
         areTags: true,
         aTagsArr: aTagsArr,
        });
    };
    this.setState({
        lTags: lTags
    });
    });
};
removeTag = (tag, imageId) => {
    axios.delete(`api/tags/delete/${tag}/${imageId}`);
    window.location.reload(false);
};
deleteBtn = (tag) => {
   return <Button onClick={() => this.removeTag(tag, this.props.thisImage)} color="white" id="deleteTagBtn" className="m-0">x</Button>

};
handleSubmit =  () => {
axios.post("/api/tags/changeLocation", {
fileId: this.props.thisImage,
currentLocation: this.state.lTags
});
window.location.reload(false);
};
locationTagsChange = () => {
    return(
  <div>
      <form>
      <TagSelect  defaultText={"Change"}/>
  <Button onClick={this.handleSubmit} color="primary">Submit</Button>
  </form>
  </div>
    );
}; 
ListDisplay = (tag, i) => {
    return(
    <li className="tagsDisplayListItem" key={i}>
    {tag}  
    {this.props.showDeleteButton ? this.deleteBtn(tag): null}
</li> 
);
};
tagsRender = () => {
     return(
            <ul className="tagsDisplayList">{
                this.state.aTagsArr.map((tag, i) => (
                 this.state.areTags ? this.ListDisplay(tag, i) : null
                    ))
             }</ul>
     );    
};
render(){
    return(
    <div>
        <div className="modalLocationTagsDisplay">
        Location: {this.state.lTags}
        {this.locationTagsChange()}
        </div>
        <hr></hr>
        <div>
        Tags: {this.state.isRendered ? this.tagsRender(): null}
    </div>
    </div>
    );
};
};
export default ModalTagsDisplay;