import React from 'react'
import ListItem from './ListItem'

const List = (props) => {
  const {title, items, children} = props
  return (
    <div>
      {title}
      <div style={{ display: 'flex' }}>
        {items && items.map((item, index) => <ListItem key={index} item={item} {...props} />)}
      </div>
      {children}
    </div>
  )
}

export default List
