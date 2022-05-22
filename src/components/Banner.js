
import React from "react";
const Banner = (props) => {
    let {title, subtitle, children} = props
    return (
        <div className="banner">
        <h1>{title}</h1>
        <div />
        <p>{subtitle}</p>
        {children}
        </div>
    );
};

export default Banner;