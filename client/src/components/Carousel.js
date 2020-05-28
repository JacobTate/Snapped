import React from "react";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Images from "../utils/Images.json";
import "semantic-ui-css/semantic.min.css";
import { Image } from "semantic-ui-react";
import "./Carousel.css";


export default () => {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 3 // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2 // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1 // optional, default to 1.
    }
  };
  return (
    <div>
      <Carousel
        ssr
        partialVisbile
        // deviceType={deviceType}
        itemClass="image-item"
        responsive={responsive}
      >
        {
          Images.map((image, index) => {
            return (
              <Image src={image.path} style={{ width: "100%", height: "100%" }} />


            )
          })
        }
      </Carousel>
    </div>
  );
}





