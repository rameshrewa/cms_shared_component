import React from "react";

import HFNMenu from "./HFNMenu";

const Header = ({ data }) => {
  
  return (
    <header id="header" className="header-section sticky">
      <div className="top-menu">
        <div className="container">
          <HFNMenu data={data?.[0]} />
        </div>
      </div>
    </header>
  );
};

export default Header;
