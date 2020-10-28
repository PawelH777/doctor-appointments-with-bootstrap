import React from 'react';

const formInput = (props) => {
    let errorMessages = [];
    const inputClases = ['form-control'];

    if (props.errors.length > 0) {
        let key = 0;
        errorMessages = props.errors.map(
            error => {
                const errorMessage =
                    (
                        <div key={key} className="form-row">
                            <small className="text-danger mt-1">
                                {error}
                            </small>
                        </div>
                    );
                key++;
                return errorMessage;
            }
        );
        inputClases.push('border-danger');
    }

    return (
        <div className="mb-3 form-group text-left">
            <label htmlFor={props.label.for}>{props.label.value}</label>
            <input type={props.attributes.type}
                className={inputClases.join(' ')}
                id={props.attributes.id}
                placeholder={props.attributes.placeholder}
                value={props.attributes.value}
                onChange={props.valueChanged} />
            {errorMessages}
        </div>
    );
};

export default formInput;