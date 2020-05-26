import React, {Component} from "react";
import axios from "axios";
import {Button} from "reactstrap";
class ModalTagsDisplay extends Component {
constructor(props){
    super(props);
    this.state = {
        isRendered: false,
        tagsArr: []
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
     const tagsArr = [];
     for (let i = 0; i < res.data.length; i++) {
       tagsArr.push(res.data[i]); 
    };
    this.setState({
        tagsArr: tagsArr
    });
    });
};
removeTag = (fileId) => {
    axios.delete(`api/tags/delete/${fileId}`);
    window.location.reload(false);
};
tagsRender = () => {
     return(
            <ul className="tagsDisplayList">{
                this.state.tagsArr.map((tag, i) => (
                    <li className="tagsDisplayListItem" key={i}>
                        {tag} <Button onClick={() => this.removeTag(this.props.thisImage)} color="white" className="m-0">x</Button>
                    </li> 
                    ))
             }</ul>
     );    
};
render(){
    return(
    <div>
        {
             this.state.isRendered ? this.tagsRender(): null
        }
    </div>
    );
};
};
export default ModalTagsDisplay;