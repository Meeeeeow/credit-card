import React from 'react';
import './styles/forminput.styles.scss'
const FormInput = ({label,...otherProps}) => {
  return (
    <div className='group'>
        <input {...otherProps} />
        {
            label ? (
                <label
                    className={`${otherProps.value.length ? 'shrink' : ''} form-input-label`} 
                > {label}</label>
            )  : null
        }
    </div>
  )
}

export default FormInput