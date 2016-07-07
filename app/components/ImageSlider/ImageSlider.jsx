import React, { Component } from 'react';

class ImageSlider extends Component {

  constructor(props) {
    super(props);
  }

  render() {

    return (
      <div id="slider-imgs">
      <div className="featured-img-box">
        <div id="featured-img-1" className="featured-img"></div>
        <div id="featured-img-2" className="featured-img invisible"></div>
        <div id="featured-img-3" className="featured-img invisible"></div>
        <div id="featured-img-4" className="featured-img invisible"></div>
      </div>
    </div>)
  }

}
export default ImageSlider;
