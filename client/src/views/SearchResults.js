import React from "react";
import { Container, Row, Col } from "reactstrap";

//import Highlight from "../components/Highlight";
import Loading from "../components/Loading";
import { useAuth0 } from "../react-auth0-spa";

import ImageRenderSearch from "../utils/ImageRenderSearch";

const SearchResults = ({history, location}) => {

  let searchTags= location.state.location.selectedOption  
  // let searchTags= new Array(location.state.location.selectedOption.length)
  // let i = 0

  // for (var key in location.state.location.selectedOption) {
  //     searchTags[i] =  location.state.location.selectedOption[key];
  //     i = i + 1;
  // }
 
  const { loading, user } = useAuth0();

  if (loading || !user) {
    return <Loading />;
  }

  return (
    <Container className="mb-5">
      <Row className="align-items-center profile-header mb-5 text-center text-md-left">
        <Col md>
          <h2>Search Results</h2>
          <p className="lead text-muted">{user.email}</p>
        </Col>
      </Row>

      <ImageRenderSearch searchTags={searchTags} userEmail={user.email}/>  
    </Container>
  );
};

export default SearchResults;
