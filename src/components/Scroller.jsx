import React from "react";
import "./Scroller.css";

export default function Scroller({ children, dataPause, dataDirection, dataSpeed, style }) {
  let notReducedMotion = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let copy = [];

  return (
    <div 
      className="d-flex custom-scrollbar scroller"
      data-animated={notReducedMotion ? "true" : undefined}
      data-pause={dataPause ? "true" : undefined}
      data-direction={dataDirection != null ? dataDirection : undefined}
      data-speed={dataSpeed != null ? dataSpeed : undefined}
      style={style != null ? style : undefined}
    >
      <div className="d-flex scroller-inner" data-elements={children.length}>
        {children}
        {notReducedMotion && 
          (children.map((child, i) => {
            let copiedChild = React.cloneElement(child, {"aria-hidden": "true", "key": i});
            copy.push(copiedChild);
          }))}
        {copy.length > 0 && copy}
      </div>
    </div>
  )
}