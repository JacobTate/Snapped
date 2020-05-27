import React from "react";
import { Carousel } from "react-responsive-carousel";
import "./Carousel.css";
import  Images from "../utils/Images.json";


export default () => (
  <div className="slider-container">

    <Carousel autoPlay>
{
  Images.map((image,index) => {
    return(
<div key = {index}>
        <img alt={image.alt} src={image.path} />
    <p className="legend">Legend {index + 1}</p>
    
        <img alt={image.alt} src={image.path}/>
        <p className="legend">Legend {index + 1}</p>
      </div>
    )
  })
}

      


    </Carousel>
  </div>




  // <Carousel autoPlay height="200px" width="200px">
  //   <div>
  //     <img alt="" src="../assets/Snapped_Logo.png" />
  //     <p className="legend"></p>
  //   </div>
  //   <div>
  //     <img alt="" src="../assets/Snapped_Logo.png" />
  //     <p className="legend"></p>
  //   </div>
  //   <div>
  //     <img alt="" src="../assets/Snapped_Logo.png" />
  //     <p className="legend"></p>
  //   </div>
  //   <div>
  //     <img alt="" src="../assets/Snapped_Logo.png" />
  //     <p className="legend"></p>
  //   </div>
  //   <div>
  //     <img alt="" src="../assets/pic1.png" />
  //     <p className="legend"></p>
  //   </div>
  //   <div>
  //     <img alt="" src="../assets/pic12.png" />
  //     <p className="legend"></p>
  //   </div>
  //   <div>
  //     <img alt="" src="../assets/pic1.png" />
  //     <p className="legend"></p>
  //   </div>
  //   <div>
  //     <img alt="" src="../assets/pic1.png" />
  //     <p className="legend"></p>
  //   </div>
  //   <div>
  //     <img alt="" src="../assets/pic1.png" />
  //     <p className="legend"></p>
  //   </div>
  //   <div>
  //     <img alt="" src="../assets/pic1.png" />
  //     <p className="legend"></p>
  //   </div>
  //   <div>
  //     <img alt="" src="../assets/pic1.png" />
  //     <p className="legend"></p>
  //   </div>
  //   <div>
  //     <img alt="" src="../assets/pic1.png" />
  //     <p className="legend"></p>
  //   </div>
  //   <div>
  //     <img alt="" src="../assets/pic1.png" />
  //     <p className="legend"></p>
  //   </div>
  //   <div>
  //     <img alt="" src="../assets/pic1.png" />
  //     <p className="legend"></p>
  //   </div>

  // </Carousel>





);



//     <Carousel autoPlay height="200px" width="200px">
// <div>
//       <img alt="" src="../assets/Snapped_Logo.png" />
//       <p className="legend"></p>
//     </div>
//     <div>
//       <img alt="" src="../assets/Snapped_Logo.png" />
//       <p className="legend"></p>
//     </div>
//     <div>
//       <img alt="" src="../assets/Snapped_Logo.png" />
//       <p className="legend"></p>
//     </div>
//     <div>
//       <img alt="" src="../assets/Snapped_Logo.png" />
//       <p className="legend"></p>
//     </div>
//     <div>
//       <img alt="" src="../assets/pic1.png" />
//       <p className="legend"></p>
//     </div>
//     <div>
//       <img alt="" src="../assets/pic12.png" />
//       <p className="legend"></p>
//     </div>
//     <div>
//       <img alt="" src="../assets/pic1.png" />
//       <p className="legend"></p>
//     </div>
//     <div>
//       <img alt="" src="../assets/pic1.png" />
//       <p className="legend"></p>
//     </div>
//     <div>
//       <img alt="" src="../assets/pic1.png" />
//       <p className="legend"></p>
//     </div>
//     <div>
//       <img alt="" src="../assets/pic1.png" />
//       <p className="legend"></p>
//     </div>
//     <div>
//       <img alt="" src="../assets/pic1.png" />
//       <p className="legend"></p>
//     </div>
//     <div>
//       <img alt="" src="../assets/pic1.png" />
//       <p className="legend"></p>
//     </div>
//     <div>
//       <img alt="" src="../assets/pic1.png" />
//       <p className="legend"></p>
//     </div>
//     <div>
//       <img alt="" src="../assets/pic1.png" />
//       <p className="legend"></p>
//     </div>
//   </Carousel>
// );

