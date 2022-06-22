import React from "react";
import "./sidebarOption.css";
const SidebarOption = ({ Icon, title, selected, number }) => {
  return (
    <div className={`sidebarOption ${selected && "sidebarOption--active"}`}>
      <Icon></Icon>
      <h3>{title}</h3>
      <p>{number}</p>
    </div>
  );
};

export default SidebarOption;
