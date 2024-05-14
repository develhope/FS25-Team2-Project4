import {useState} from 'react';
import PopupFilter from "./PopupFilter.jsx";
import '../styles/header.css';

// Header uses the useState hook to manage the state of showPopupFilter and headerTitle:
// h1 element wit h the headerTitle,
// button that sets showPopupFilter to true when clicked = conditionally renders a PopupFilter component based on the showPopupFilter state.
const Header = (title = "Discovery") => {
    const [showPopupFilter, setShowPopupFilter] = useState(false);
    const [headerTitle] = useState(title);

    return (
        <header>
            <h1 className={'headerTitle'}>{headerTitle}</h1>
            <button onClick={() => setShowPopupFilter(true)}>Filters</button>
            {showPopupFilter && <PopupFilter />}
        </header>
    );
}

export default Header;