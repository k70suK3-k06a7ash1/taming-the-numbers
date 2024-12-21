export const Spacer = ({ size = 16, horizontal = false }) => {
  const style = {
    display: horizontal ? "inline-block" : "block",
    width: horizontal ? size : 0,
    height: horizontal ? 0 : size,
  };

  return <div style={style} />;
};
