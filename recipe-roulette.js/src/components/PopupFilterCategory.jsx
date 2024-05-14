import { useState } from 'react';

/**
 * Renders a button filter component.
 *
 * @param {string} name - The name to be displayed on the button
 * @param {boolean} stateSelected - The state of the button (true for green, false for red)
 * @param {function} onClick - The function to be called when the button is clicked
 * @return {JSX.Element} The JSX element representing the button filter
 */
const SwitchFilter = ({ name, stateSelected, onClick }) => {
    return (
        <button style={{ backgroundColor: stateSelected ? 'green' : 'red' }} onClick={onClick}>
            {name}
        </button>
    );
}

/**
 * Renders a popup filter category with buttons that can be toggled.
 *
 * @param {string} categoryName - The name of the category
 * @param {Array} categoryFilters - An array of category filters
 * @return {JSX.Element} The JSX element representing the popup filter category
 */
const PopupFilterCategory = ({ categoryName, categoryFilters }) => {
    const [buttonStates, setButtonStates] = useState(categoryFilters.map(filter => filter.stateSelected));

    const handleButtonClick = (index) => {
        const newButtonStates = [...buttonStates];
        newButtonStates[index] = !newButtonStates[index];
        setButtonStates(newButtonStates);
    }

    return (
        <div>
            <h2>{categoryName}</h2>
            {categoryFilters.map((categoryFilter, index) => (
                <SwitchFilter
                    key={index}
                    name={categoryFilter.name}
                    stateSelected={buttonStates[index]}
                    onClick={() => handleButtonClick(index)}
                />
            ))}
        </div>
    );
}

export default PopupFilterCategory;