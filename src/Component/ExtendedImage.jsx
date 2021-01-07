import React from 'react';
import './style.css';

export default function ExtendedImage(props) {
  return (
    <div className='abc'>
      <img className='extended-img' src={props.url} alt='' />
      <button className='close-extended-img' onClick={() => props.setShowModal(false)}>
        x
      </button>
    </div>
  );
}
