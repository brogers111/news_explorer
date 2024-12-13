import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';

import './App.css';

function App() {
    return (
        <div className="page__wrapper">
            <div className="page">
                <div className="page__content">
                    <Header />
                    <Main />
                </div>
                <Footer />
            </div>
        </div>
    )
}

export default App
