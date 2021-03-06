import React from "react";
import MyNavbar from "../components/Navbars/MyNavbar";
import MyFooter from "../components/Footers/MyFooter";

export const Layout = props => {
  React.useEffect(() => {
    document.body.classList.add("sidebar-collapse");
    document.documentElement.classList.remove("nav-open");
    return function cleanup() {
      document.body.classList.remove("sidebar-collapse");
    };
  });
  return (
    <>
      <MyNavbar
        transparent={props.transparent}
        scroll={props.scroll ? props.scroll : undefined}
      />
      <div className="wrapper">{props.children}</div>
      <MyFooter />
    </>
  );
};
