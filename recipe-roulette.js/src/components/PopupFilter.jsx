import PopupFilterCategory from "./PopupFilterCategory.jsx";

const PopupFilter = ({ data }) => {
    return (
        <div>
            {data.map((filterCategory, index) => (
                <PopupFilterCategory key={index} categoryName={filterCategory.categoryName} categoryFilters={filterCategory.categoryFilters} />
            ))}
        </div>
    );
}

export default PopupFilter;