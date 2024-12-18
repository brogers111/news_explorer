import './Footer.css';

function Footer() {
    return (
        <footer className="footer">
            <p className="footer__details">&copy;2024 Supersite, Powered by News API</p>
            <nav className="footer__nav">
                <ul className="footer__nav-links">
                    <div className="footer__site-links">
                        <li className="footer__item">
                            <a href="/" className="footer__link footer__link_type_home">Home</a>
                        </li>
                        <li className="footer__item">
                            <a href="https://tripleten.com/" className="footer__link footer__link_type_tripleten" target="_blank" rel="noopener noreferrer">TripleTen</a>
                        </li>
                    </div>
                    <div className="footer__social-links">
                        <li className="footer__item">
                            <a href="https://github.com/tripleten-com" className="footer__link footer__link_type_github" target="_blank" rel="noopener noreferrer"></a>
                        </li>
                        <li className="footer__item">
                            <a href="https://www.facebook.com/tripleten.tech/" className="footer__link footer__link_type_facebook" target="_blank" rel="noopener noreferrer"></a>
                        </li>
                    </div>
                </ul>
            </nav>
        </footer>
    );
}

export default Footer;
