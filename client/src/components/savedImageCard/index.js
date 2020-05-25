import React, { useState } from 'react';
import {Card, Button, CardImg, CardDeck, CardBody} from 'reactstrap';
import axios from "axios";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// styles
import "./savedImageCard.css";

function saveImage(imageId, userEmail, imageIdArr, setPlus, setMinus) {    
    //showPlus = false;
    setPlus(false);
    setMinus(true)
    // console.log("showPlus: " + showPlus)
    axios.post("/save", {
        imageId,
        userEmail,
        imageIdArr
    });
    
}

function unsaveImage(imageId, userEmail, imageIdArr, setPlus, setMinus) {
    //showMinus = false;
    setMinus(false)
    setPlus(true)
    // console.log("showMinus: " + showMinus)
    console.log("unsave imageId: " + imageId)
    axios.post("/unsave", {
        imageId,
        userEmail,
        imageIdArr
    });
    
}

const Example = (props) => {

    console.log("props: " + JSON.stringify(props))
    console.log("userEmail savedImageCard: " + props.userEmail)
    //console.log("isSavedImage: " + props.isSavedImage)

    let initPlus = false;
    let initMinus = true;
    
    //let isSaved = props.isSavedImage
    //console.log("isSaved: " + isSaved)
    
    // if (isSaved == false) {
    //     initPlus = true
    //     console.log("its true")
    // } else {
    //     initMinus = true
    //     console.log("its false")
    // }
    
    const [showPlus, setPlus] = useState(initPlus)
    const [showMinus, setMinus] = useState(initMinus)

    return (
        <CardDeck>
            <Card>
                <CardImg top width="100%" src={props.image} alt="Card image cap" />
                <CardBody>
                    <Button onClick={() => alert("Left click the image and select 'Save image as' to download")} color="white" className="m-0"><FontAwesomeIcon icon="file-download" color="rgba(91, 192, 222, 0.75)" className="m-0" /></Button>
                    {/* <Button color="white"className="m-0"><FontAwesomeIcon icon="plus-circle" color="rgba(91, 192, 222, 0.75)" className="m-0" /></Button> */}
                    {/* <Button color="white"className="m-0"><FontAwesomeIcon icon="minus-circle" color="rgba(91, 192, 222, 0.75)" className="m-0" /></Button> */}
                    { showPlus && (
                    <Button color="white" value={props.thisImage} onClick={() => saveImage(props.thisImage, props.userEmail, props.imageIdArr, setPlus, setMinus)} className="m-0"><FontAwesomeIcon icon="plus-circle" color="rgba(91, 192, 222, 0.75)" className="m-0" /></Button>
                    )}
                    { showMinus && (
                    <Button color="white" value={props.thisImage} onClick={() => unsaveImage(props.thisImage, props.userEmail, props.imageIdArr, setPlus, setMinus)} className="m-0"><FontAwesomeIcon icon="minus-circle" color="rgba(91, 192, 222, 0.75)" className="m-0" /></Button>
                    )}   
                </CardBody>
            </Card>
        </CardDeck>
    );
};

export default Example;