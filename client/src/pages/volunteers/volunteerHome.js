import React, { useState } from 'react';


const VolHome = () => {
    const [content, setContent] = useState('Home');

    const handleNavClick = (section) => {
        setContent(section);
    };

    return (
        <div className="container">
            <div className="navigation">
                <ul>
                    <li onClick={() => handleNavClick('Home')}>Home</li>
                    <li onClick={() => handleNavClick('About')}>About</li>
                    <li onClick={() => handleNavClick('Services')}>Services</li>
                    <li onClick={() => handleNavClick('Contact')}>Contact</li>
                </ul>
            </div>
            <div className="content">
                {content === 'Home' && <div>Home Content</div>}
                {content === 'About' && <div>About Content</div>}
                {content === 'Services' && <div>Services Content</div>}
                {content === 'Contact' && <div>Contact Content</div>}
            </div>
        </div>
    );
};

export default VolHome;