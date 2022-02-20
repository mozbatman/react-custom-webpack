import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <div className="header">
            <div>Header</div>
            <Link to='/lazy'>Lazy Page</Link>
        </div>
    );
}

export default Header;