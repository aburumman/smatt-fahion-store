import React from 'react';

const Skeleton = ({ variant = 'text', width, height, count = 1, className = '' }) => {
  const elements = Array.from({ length: count });

  const getStyles = () => {
    const styles = {};
    if (width) styles.width = typeof width === 'number' ? `${width}px` : width;
    if (height) styles.height = typeof height === 'number' ? `${height}px` : height;
    return styles;
  };

  return (
    <>
      {elements.map((_, i) => (
        <div
          key={i}
          className={`skeleton skeleton-${variant} ${className}`}
          style={getStyles()}
        />
      ))}
    </>
  );
};

export default Skeleton;
