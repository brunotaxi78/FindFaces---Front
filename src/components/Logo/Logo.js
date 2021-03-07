import React from 'react';
import Tilt from 'react-tilt';
import FaceLogo from './face.png';
import './Logo.css';


const Logo = () => {
    return (
        <div className='ma4 mt0 center'>
            <Tilt className="Tilt br-2 shadow-2" options={{ max : 25 }} style={{ height: 150, width: 150 }} >
            <div className="Tilt-inner"><img src={FaceLogo} alt="FaceLogo"></img></div>
            </Tilt>
        </div>
    );
}

export default Logo;