/**
 * Renders a button that toggles a popup filter when clicked.
 *
 * @param {function} onClick - Function to be called when the button is clicked
 * @return {JSX.Element} Button component with a click handler
 */
import {useState} from "react";

const ButtonShowPopupFilter = ({ onClick }) => {
    const [showPopupFilter, setShowPopupFilter] = useState(false);

    const handleClick = () => {
        setShowPopupFilter(!showPopupFilter);
        onClick(); // You can call the onClick function passed from the parent component if needed
    }

    return (
        <button onClick={handleClick}>Filters</button>
    );
}

export default ButtonShowPopupFilter;