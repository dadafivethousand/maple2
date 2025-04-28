import React, {useEffect, useState} from "react";
import "../Stylesheets/BJJWhiteBelt.css";
 

export default function BJJBelt({ color = "purple" }) {

  const [blackBelt, setBlackBelt] = useState(false) 
  const beltColors = {
    white: "#ffffff",
    blue: "#2b5dab",
    purple: "#800080",
    brown: "#5c4033",
    black: "#000000"
  };

  useEffect(()=>{
 color == "black" && setBlackBelt(true)
  }, [])



  const beltColor = beltColors[color.toLowerCase()] || "#ffffff";

  return (
    <div className="belt-wrapper">
      <div className="belt" style={{ backgroundColor: beltColor }}>
        <div className="black-bar"></div>
      </div>
    </div>
  );
}
