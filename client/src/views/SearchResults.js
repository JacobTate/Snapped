import React from "react";
import { Container, Row, Col, Button } from "reactstrap";
import { NavLink as RouterNavLink } from "react-router-dom";
import Loading from "../components/Loading";
import { useAuth0 } from "../react-auth0-spa";
import ImageRenderSearch from "../utils/ImageRenderSearch";
import searchResults from "../assets/searchResults.jpg";

const SearchResults = ({history, location}) => {

  let dspSearchTags = "Search Criteria: "
  let searchTags= location.state.location.selectedOption  
     
  //Add search criteria to Search Results page
  for(let i = 0; i < searchTags.length; i ++) {
    
    dspSearchTags += searchTags[i].label
    
    if(i < (searchTags.length - 1)) {
      dspSearchTags += ", "
    }
    //console.log("dspSearchTags: " + dspSearchTags)
  }

  const { loading, user } = useAuth0();

  if (loading || !user) {
    return <Loading />;
  }

  return (
    <Container className="mb-5">
      <Row className="align-items-center profile-header mb-5 text-center text-md-left">
        <img src={searchResults} id="searchResults" width="75%" height="" alt="searchResults" />
        {/* <p className="lead text-muted">{dspSearchTags}</p> */}
        <Col md>
          {/* <h2>Search Results</h2> */}
          {/* <p className="lead text-muted">{user.email}</p> */}
          {/* <p className="lead text-muted">{dspSearchTags}</p> */}
        </Col>
        {/* <img src={searchResults} id="savedSnapps" width="75%" height="" alt="searchResults" /> */}
      </Row>
      <Row>
      <Button
        tag={RouterNavLink}
        to="/"
        exact
        // color="primary"
        className="btn btn-info"
      // activeClassName="router-link-exact-active"
      >
        Go Back
      </Button>
          <p className="lead text-muted">{dspSearchTags}</p>
      </Row>

      <ImageRenderSearch searchTags={searchTags} userEmail={user.email}/>  
    </Container>
  );
};

export default SearchResults;
