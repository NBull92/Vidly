import React from 'react';

//  use the spread operator '...' to include any of the other explicitly stated properties of an input. 
//  This saves repetitive code and having to add an Input property each time you want to use one.
const Input = ({ name, label, error, ...rest }) => {
    return ( 
        <div className="form-group mb-3">
            <label  htmlFor={name} 
                    className="form-label">{ label }</label>
            <input  {...rest} 
                    name={name}
                    id={name}
                    className="form-control" />
                    {/* ref={this.username} */}
            {error && <div className="alert alert-danger">  {/*'error &&' if error is not equal to null, show div */}
                {error}
            </div>}
        </div>
     );
}
 
export default Input;