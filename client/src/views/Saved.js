import React from "react";
import { Container, Row, Col } from "reactstrap";

//import Highlight from "../components/Highlight";
import Loading from "../components/Loading";
import { useAuth0 } from "../react-auth0-spa";

import ImageRenderAll from "../utils/ImageRenderAll";

const Saved = () => {
  const { loading, user } = useAuth0();

  if (loading || !user) {
    return <Loading />;
  }

  return (
    <Container className="mb-5">
      <Row className="align-items-center profile-header mb-5 text-center text-md-left">
        <Col md>
          <h2>Saved Snapps</h2>
          {/* <h2>{user.name}</h2> */}
          <p className="lead text-muted">{user.email}</p>
        </Col>
      </Row>

      <ImageRenderAll userEmail={user.email}/>  

    </Container>
  );
};

export default Saved;
