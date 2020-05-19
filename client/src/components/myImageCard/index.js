import React from 'react';
import {
    Card, Button, CardImg, CardTitle, CardText, CardDeck,
    CardSubtitle, CardBody
} from 'reactstrap';

const Example = (props) => {
    return (
        <CardDeck>
            <Card>
                <CardImg top width="100%" src={props.image} alt="Card image cap" />
                <CardBody>
                    <Button>Download</Button>
                    
                    {/* <Button>Delete</Button>
                    
                    <Button>Tag</Button>                     */}
                </CardBody>
            </Card>

        </CardDeck>
    );
};

export default Example;