import { Avatar } from "@material-ui/core";
import React from "react";
import "../css/HeaderOption.css"


export default function HeaderOption(props) {
    const { Icon, title, avatar, onClick } = props;
    return (
      <div className="headerOption" onClick={onClick}>
        {/* if icon is set */}
        {Icon && <Icon className="headerOption__icon" />}
        {avatar && <Avatar className="headerOption__icon" src={avatar} />}
        <h3 className="headerOption__title">{title}</h3>
      </div>
    );
}