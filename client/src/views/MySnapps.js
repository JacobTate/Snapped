import React, { useState } from "react";
import { Container } from "reactstrap";
import  TagSelect from "../utils/TagSelect";

import { useAuth0 } from "../react-auth0-spa";
import ImageRender from "../utils/ImageRender";

//class MySnapps extends Component {
const MySnapps = function () {
  //const { loading, user } = useAuth0();
  const { user } = useAuth0();
  //fileselected is a custom global variable 
  //setFileSelected is a custom functon to update the fileselected global variable
  //useState allows you to have a custom state object for data storage
  const [fileSelected, setFileSelected ] = useState("")

  const handleChange = event => {
    //fileSelected="iamge.png"
    //setFileSelected("image.png")
    console.log(`Selected file - ${event.target.files[0].name}`);
    setFileSelected(event.target.files[0].name)
  };
  return (
    <Container>
      <form action="/upload" method="POST" encType="multipart/form-data">
      <TagSelect defaultText={"Select a location"}/>
        <p className="lead text-muted">{user.email}</p>
        <input type="hidden" name="userEmail" value={user.email}
          useRef={user.email} />
        <div className="custom-file mb-3">
          <input accept="image/x-png,image/gif,image/jpeg " type="file" name="file" id="file" className="custom-file-input" onChange={handleChange} required></input>
          <label htmlFor="file" className="custom-file-label">{fileSelected.length >0? fileSelected : "Choose File"}</label>
        </div>
        <input type="submit" value="Submit" className="btn btn-primary btn-block"></input>
      </form>

      <ImageRender userEmail={user.email} />

    </Container>

  );
}


export default MySnapps;
