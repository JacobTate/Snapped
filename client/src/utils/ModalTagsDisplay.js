import React, {Component} from "react";
import axios from "axios";
import {Button} from "reactstrap";
import TagSelect from "./TagSelect";
import ModalForm from "./ModalForm";
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
};
updateTags = event => {
 const tagName = [event.target.value];
    const tagFilter = this.state.aTagsArr.filter(item => !tagName.includes(item));
    this.setState({aTagsArr: tagFilter});
    
};
deleteBtn = (tag) => {
   return <Button value={tag} onClick={(event) => {this.updateTags(event); this.removeTag(tag, this.props.thisImage)}} color="white" id="deleteTagBtn" className="m-0">x</Button>

};
handleSubmit = () => {
axios.post("/api/tags/changeLocation", {
fileId: this.props.thisImage,
currentLocation: this.state.lTags
});
};
locationTagsChange = () => {
    return(
  <div>
      <form>
      <TagSelect defaultText={"Change"}/>
  <Button onClick={() => {this.handleSubmit(); this.getTags(this.props.thisImage)}} color="primary">Submit</Button>
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
showModalFrom = () => {
    return(
        <ModalForm getTags={this.getTags.bind(this)} imageId={this.props.thisImage}/>

    );
};
render(){
    return(
    <div>
        {this.props.showDeleteButton ? this.showModalFrom(): null}
        <div className="modalLocationTagsDisplay">
        Location: {this.state.lTags}
        {this.props.showDeleteButton ? this.locationTagsChange(): null}
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