const renderThumbVertical = ({
  style,
  ...props
}: {
  style: React.CSSProperties;
}) => {
  const thumbStyle: React.CSSProperties = {
    backgroundColor: 'rgba(0,0,0,0.2)',
    borderRadius: '4px',
    zIndex: 10,
    overflowX: 'hidden',
  };
  return <div style={{ ...style, ...thumbStyle }} {...props} />;
};

export default renderThumbVertical;
