import React, {useState} from 'react';
import {
    Card, Button, CardImg, CardDeck,
    CardBody, Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap';
import axios from "axios";
import ModalForm from "../../utils/ModalForm";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ModalTagsDisplay from "../../utils/ModalTagsDisplay";
// styles
import "./myImageCard.css";
//import TagSelect from "../../utils/AactivityTagsSelect";

const Example = (props) => {
    const {
        //buttonLabel,
        className
      } = props;
    
      const [modal, setModal] = useState(false);
    
      const toggle = () => {
          setModal(!modal);
    };
    const deleteBtn = (fileId) => {
        axios.post(`/api/delete/`,{
           fileId: fileId
        });
     window.location.reload(false);
    };

    return (
        <div>  
        <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>Modal title</ModalHeader>
        <ModalBody>
            <ModalForm imageId={props.thisImage}/>
        </ModalBody>
        <ModalFooter>
          <ModalTagsDisplay thisImage={props.thisImage} showDeleteButton={true}/>
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
        <CardDeck>
            <Card className="CardListItem-main-card">
                <CardImg top width="100%" src={props.image} alt="Card image cap" className="cardSize" />
                <CardBody>
                 {/* <Button color="white"  className="m-0"><FontAwesomeIcon icon="file-download" color="rgba(91, 192, 222, 0.75)" className="m-0" /></Button> */}
                    <Button onClick={() => {deleteBtn(props.thisImage)}} color="white"className="m-0"><FontAwesomeIcon icon="trash-alt" color="rgba(91, 192, 222, 0.75)" className="m-0" /></Button>
                    <Button color="white" value={props.thisImage}  onClick={toggle} className="m-0 "><FontAwesomeIcon icon="tag" color="rgba(91, 192, 222, 0.75)" className="m-0" /></Button>
                </CardBody>
            </Card>
        </CardDeck>
        </div>
    );
};

export default Example;