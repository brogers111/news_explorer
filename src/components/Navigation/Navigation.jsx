import { Link } from 'react-router-dom';
import './Navigation.css';

function Navigation() {
    return(
        <nav className="nav">
            <Link to="/" className='nav__logo-link'>
                <p className="nav__logo">NewsExplorer</p>
            </Link>
            <div className="nav__links">
                <button className="nav__home-button">Home</button>
                <button className="nav__signin-button">Sign in</button>
            </div>
        </nav>
    )
}

export default Navigation;