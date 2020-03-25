import React from "react";

const MyParallaxHeader = () => {
  let parallaxComponent = React.createRef();
  React.useEffect(() => {
    if (window.innerWidth > 991) {
      const updateScroll = () => {
        let windowScrollTop = window.pageYOffset / 3;
        parallaxComponent.current.style.transform =
          "translate3d(0," + windowScrollTop + "px,0)";
      };
      window.addEventListener("scroll", updateScroll);
      return function cleanup() {
        window.removeEventListener("scroll", updateScroll);
      };
    }
  });

  return (
    <div className="page-header page-header-small">
      <div
        className="page-header-image"
        style={{
          backgroundImage: "url('../clubphoto.jpg')"
        }}
        ref={parallaxComponent}
      ></div>
      <div className="content-center">
        <div className="container">
          <h2 className="title">BHCC Computer Science Exchange</h2>
        </div>
      </div>
    </div>
  );
};

export default MyParallaxHeader;
