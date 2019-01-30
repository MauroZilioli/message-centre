// filters children and returns those of type name allowed, or excluding those if optional invert flag passed
export const slot = (children, allowed, invert) => {
  const names = Array.isArray(allowed) ? allowed : [allowed];
  return children && (Array.isArray(children) ? children : [children])
    .filter(component =>
      component.type && (!invert === names.some(name => name === component.type.name)));
};

// helpful to concatenate css class names
export const join = (...args) =>
  [...args]
    .filter(name => !!name)
    .join(' ');
