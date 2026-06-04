import React from 'react';
import '../styles/HCHome.css';
import Button from '../components/HCButton';
import { useNavigate } from 'react-router-dom';

const HCHome = () => {
    const navigate = useNavigate();
    return(
        <div className="bghome">
            <div className="text-heading-small">CONNECTING PRE PLAY TO CLASS 12</div>
            <div className="text-heading-large">Happy Child</div>
            <div className="buttons">
                <div>
                    <Button myclass="buttonBookAppt" onClick={() => navigate('/post-add')}><h2>Post Add</h2></Button>
                </div>
                <div>
                    <Button myclass="buttonlearn"><h3>Learn More</h3></Button>
                </div>
            </div>
        </div>
    )
}
export default HCHome;