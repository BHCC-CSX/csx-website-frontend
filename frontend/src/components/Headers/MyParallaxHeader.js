import React from "react";
import PropTypes from "prop-types";

const MyParallaxHeader = (props) => {

  let parallaxComponent = React.createRef();
  React.useEffect(() => {
      const updateScroll = () => {
        let windowScrollTop = window.pageYOffset / 3;
        parallaxComponent.current.style.transform =
          "translate3d(0," + windowScrollTop + "px,0)";
      };
      window.addEventListener("scroll", updateScroll);
      return function cleanup() {
        window.removeEventListener("scroll", updateScroll);
      };
  });

  return (
    <div className="page-header page-header-small">
      <div
        className="page-header-image"
        style={{
          backgroundImage: "url('" + props.headerImage + "')"
        }}
        ref={parallaxComponent}
      ></div>
      <div className="content-center">
        <div className="container">
          <h2 className="title">{props.headerText}</h2>
        </div>
      </div>
    </div>
  );
};

MyParallaxHeader.propTypes = {
  headerImage: PropTypes.string,
  headerText: PropTypes.string
};

export default MyParallaxHeader;
