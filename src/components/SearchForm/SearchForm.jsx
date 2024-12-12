import './SearchForm.css';

function SearchForm() {
    return (
        <div className="form">
            <h1 className="form__header">What&apos;s going on in the world?</h1>
            <p className="form__desc">Find the latest news on any topic and save them in your personal account.</p>
            <form className="form__search">
                <input type="text" name='keyword' className='form__input' placeholder='Enter topic'/>
                <button type="submit" className="form__submit-button">Search</button>
            </form>
        </div>
    )
}

export default SearchForm
