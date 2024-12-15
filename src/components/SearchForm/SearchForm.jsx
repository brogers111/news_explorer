import { useState } from 'react';
import './SearchForm.css';

function SearchForm({ handleSearch }) {
    const [keyword, setKeyword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        handleSearch(keyword);
    }

    return (
        <div className="form">
            <h1 className="form__header">What&apos;s going on in the world?</h1>
            <p className="form__desc">Find the latest news on any topic and save them in your personal account.</p>
            <form className="form__search" onSubmit={handleSubmit}>
                <input
                    type="text"
                    name='keyword'
                    className='form__input'
                    placeholder='Enter topic'
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                />
                <button type="submit" className="form__submit-button">Search</button>
            </form>
        </div>
    )
}

export default SearchForm
