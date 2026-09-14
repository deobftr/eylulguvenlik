const StarBorder = ({ as, className = "", color = "#ffffff, #333333, #ffffff", speed = "6s", children, ...props }) => {
  const Component = as || "button";
  return (
    <Component className={`star-border-container ${className}`} {...props}>
      <div
        className="border-gradient-full"
        style={{ background: `conic-gradient(from 0deg, transparent, ${color}, transparent)`, animationDuration: speed }}
      />
      <div className="inner-content">{children}</div>
    </Component>
  );
};

export default StarBorder;
