import React from 'react'

const childrenWithProps = (props, extraProps) => {
  const newProps = Object.assign({}, props, extraProps)
  delete newProps.children
  const children = React.Children.map(props.children, (child) => React.cloneElement(child, newProps))
  return children
}

export default childrenWithProps
