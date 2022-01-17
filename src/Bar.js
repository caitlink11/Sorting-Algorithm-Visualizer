const Bar = (props) => {
  return (
    <div
      style={{
        width: "1.5vw",
        height: props.value,
        backgroundColor:
          (props.primaryIdx && "#fad2e1") ||
          (props.secondaryIdx && "#ADD8E6") ||
          "#cddafd",
        margin: 2,
        display: "inline-block",
      }}
    />
  );
};

export default Bar;
