import React from "react";
import MyNavbar from "../components/Navbars/MyNavbar";
import MyFooter from "../components/Footers/MyFooter";

export const Layout = (props) => {
    return(
        <>
            <MyNavbar transparent={props.transparent} scroll={props.scroll ? props.scroll : undefined} />
            <div className="wrapper">
                {props.children}
            </div>
            <MyFooter />
        </>
        );
}