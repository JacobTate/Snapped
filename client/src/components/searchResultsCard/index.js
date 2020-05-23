import React from 'react';
import {Card, Button, CardImg, CardDeck, CardBody} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import "./searchResultsCard.css";
import axios from "axios";

// state = {
//     showDiv: true
// }

function saveImage(imageId, userEmail, imageIdArr, showDiv) {
    console.log("userEmail index.searchResultsCard: " + userEmail)
        
    showDiv = false;
    console.log("showdiv: " + showDiv)
    //this.setState({ showDiv: !showDiv })

        axios.post("/save", {
            imageId,
            userEmail,
            imageIdArr
        });
    
}

const Example = (props) => {
    console.log("props: " + JSON.stringify(props))
    console.log("userEmail top index: " + props.userEmail)
    
    let showDiv = true;
    //const { showDiv } = this.state //TODO:

    return (
        <CardDeck>
            <Card>
                <CardImg top width="100%" src={props.image} alt="Card image cap" />
                <CardBody>
                    <Button color="white" value="test" className="m-0"><FontAwesomeIcon icon="file-download" color="rgba(91, 192, 222, 0.75)" className="m-0" /></Button>
                    {/* <Button color="white" value={props.thisImage} onClick={() => this.handleSubmit(props.thisImage)} className="m-0"><FontAwesomeIcon icon="plus-circle" color="rgba(91, 192, 222, 0.75)" className="m-0" /></Button> */}
                    
                    { showDiv && (
                    <Button color="white" value={props.thisImage} onClick={() => saveImage(props.thisImage, props.userEmail, props.imageIdArr, showDiv)} className="m-0"><FontAwesomeIcon icon="plus-circle" color="rgba(91, 192, 222, 0.75)" className="m-0" /></Button>
                    )}

                    {/* <Button color="white" value={props.thisImage} className="m-0"><FontAwesomeIcon icon="minus-circle" color="rgba(91, 192, 222, 0.75)" className="m-0" /></Button> */}
                </CardBody>
            </Card>
        </CardDeck>
    );
};

export default Example;