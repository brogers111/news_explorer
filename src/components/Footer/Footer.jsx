import './Footer.css';

function Footer(){
    return(
        <footer className="footer">
            <p className="footer__details">&copy;2024 Supersite, Powered by News API</p>
            <div className="footer__links">
                <button className="footer__home-link">Home</button>
                <button className="footer__tripleten-link">TripleTen</button>
                <button className="footer__github-link"></button>
                <button className="footer__facebook-link"></button>
            </div>
        </footer>
    )
}

export default Footer;