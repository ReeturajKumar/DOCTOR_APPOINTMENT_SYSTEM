import React from 'react';
import { PropagateLoader } from 'react-spinners';

const Spinner = () => {
  return (
    <div className='tex-center spinner'>
    <PropagateLoader color="#000" />
    </div>
  );
}

export default Spinner;
