import React from 'react';
import {
    Card, Button, CardImg, CardTitle, CardText, CardDeck,
    CardSubtitle, CardBody
} from 'reactstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// styles
import "./myImageCard.css";

const Example = (props) => {
    return (
        <CardDeck>
            <Card className="CardListItem-main-card">
                <CardImg top width="100%" src={props.image} alt="Card image cap" className="cardSize" />
                <CardBody>
                    <Button color="white" className="m-0"><FontAwesomeIcon icon="file-download" color="rgba(91, 192, 222, 0.75)" className="m-0" /></Button>
                    <Button color="white"className="m-0"><FontAwesomeIcon icon="trash-alt" color="rgba(91, 192, 222, 0.75)" className="m-0" /></Button>
                    <Button color="white"className="m-0"><FontAwesomeIcon icon="tag" color="rgba(91, 192, 222, 0.75)" className="m-0" /></Button>
                </CardBody>
            </Card>
        </CardDeck>
    );
};

export default Example;