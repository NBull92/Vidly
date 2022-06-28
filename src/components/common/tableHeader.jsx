import React, { Component } from 'react';
import { faArrowAltCircleUp , faArrowAltCircleDown} from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class TableHeader extends Component {
    
    render() { 
        return <thead>
                    <tr>
                        {
                            this.props.columns.map(column => (
                                <th className='clickable'
                                    key={column.path || column.key} 
                                    scope="col" 
                                    onClick={() => this.raiseSort(column.path)}>
                                        {column.label} {this.renderSortIcon(column)}
                                </th>
                            ))
                        }
                    </tr>
                </thead>;
    }

    renderSortIcon = column => {
        const { sortColumn } = this.props;

        if(column.path !== sortColumn.path) return null;

        if(sortColumn.order === 'asc')
            return <FontAwesomeIcon icon={faArrowAltCircleUp}/>
            
        if(sortColumn.order === 'desc')
            return <FontAwesomeIcon icon={faArrowAltCircleDown} />
    };

    raiseSort = path => {
        const sortColumn = {...this.props.sortColumn};
        
        if(sortColumn.path === path)
        {
            sortColumn.order = (sortColumn.order === 'asc')
                ? 'desc'
                : 'asc';
        }
        else
        {
            sortColumn.path = path;
            sortColumn.order = 'asc';
        }

        this.props.onSort(sortColumn);
    };
}
 
export default TableHeader;