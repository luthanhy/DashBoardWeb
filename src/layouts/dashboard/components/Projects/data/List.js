import React from 'react';

const ListItem = ({ item }) => (
  <div>
    <h3>{item.name}</h3>
    <p>{item.description}</p>
  </div>
);

const List = ({ data }) => (
  <div>
    {data.map(item => (
      <ListItem key={item.id} item={item} />
    ))}
  </div>
);

export default List;
