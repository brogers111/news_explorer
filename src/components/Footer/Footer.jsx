import './Footer.css';

function Footer() {
    return (
        <footer className="footer">
            <p className="footer__details">&copy;2024 Supersite, Powered by News API</p>
            <div className="footer__links">
                <a href="/" className="footer__home-link">Home</a>
                <a href="https://tripleten.com/" className="footer__tripleten-link">TripleTen</a>
                <a href="https://github.com/tripleten-com" className="footer__github-link"></a>
                <a href="https://www.facebook.com/tripleten.tech/" className="footer__facebook-link"></a>
            </div>
        </footer>
    );
}

export default Footer;
