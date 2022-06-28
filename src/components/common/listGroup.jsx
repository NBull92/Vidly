import React from 'react';

const ListGroup = ({ items, textProperty, valueProperty, onItemSelected, selectedItem}) => {
//    const { items, textProperty, valueProperty, onItemSelected, selectedItem} = props;
   
    return  <ul className="list-group">
                {
                    items.map(item =>(
                        <li onClick={() => onItemSelected(item)} 
                            key={item[valueProperty]} 
                            className={item === selectedItem ? "list-group-item active clickable" : "list-group-item clickable"}>
                                {item[textProperty]}
                        </li>
                    ))
                }
            </ul>
}
 
ListGroup.defaultProps = {
    textProperty: 'name',
    valueProperty: '_id'
}

export default ListGroup;