import { forwardRef } from "react";
import "./Slider.css";

const Slider = forwardRef((props, ref) => {
  return (
    <div style={{ margin: "15px", display: "inline" }}>
      <p style={{ display: "inline", fontSize: 15 }}>
        {props.id[0].toUpperCase() + props.id.slice(1, -6) + ": "}
      </p>
      <input
        className="slider"
        type="range"
        min={props.min}
        max={props.max}
        step={props.step}
        id={props.id}
        onChange={props.onChange}
        ref={ref}
        disabled={props.disabled}
      ></input>
    </div>
  );
});

export default Slider;
