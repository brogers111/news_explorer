import Header from '../Header/Header';
import About from '../About/About';
import Footer from '../Footer/Footer';

import './App.css';

function App() {
    return (
        <div className="page__wrapper">
            <div className="page">
                <div className="page__content">
                    <Header />
                    <About />
                </div>
                <Footer />
            </div>
        </div>
    )
}

export default App
