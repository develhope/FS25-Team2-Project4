let ingredientsArray = [
    {
        id: 1,
        name: "Potato",
        bgColor: "#f0e68c", // Light yellow (Pastel)
        categoria: "Vegetable",
        affinità: ["Onion", "Garlic", "Rosemary", "Butter", "Salt"],
        isBlackListed: false,
        isVegan: true,
        isGlutenFree: true,
        isVegetarian: true,
        isSelected: false,
    },
    {
        id: 2,
        name: "Onion",
        bgColor: "#f7c6c7", // Light pink (Pastel)
        categoria: "Vegetable",
        affinità: ["Potato", "Garlic", "Thyme", "Butter", "Pepper"],
        isBlackListed: false,
        isVegan: true,
        isGlutenFree: true,
        isVegetarian: true,
        isSelected: false,
    },
    {
        id: 3,
        name: "Garlic",
        bgColor: "#c7f0da", // Light mint green (Pastel)
        categoria: "Vegetable",
        affinità: ["Potato", "Onion", "Rosemary", "Olive Oil", "Salt"],
        isBlackListed: false,
        isVegan: true,
        isGlutenFree: true,
        isVegetarian: true,
        isSelected: false,
    },
    {
        id: 4,
        name: "Rosemary",
        bgColor: "#c9c8f0", // Light lavender (Pastel)
        categoria: "Herb",
        affinità: ["Potato", "Garlic", "Thyme", "Olive Oil", "Salt"],
        isBlackListed: false,
        isVegan: true,
        isGlutenFree: true,
        isVegetarian: true,
        isSelected: false,
    },
    {
        id: 5,
        name: "Butter",
        bgColor: "#f0dfc7", // Light beige (Pastel)
        categoria: "Dairy",
        affinità: ["Potato", "Onion", "Garlic", "Thyme", "Pepper"],
        isBlackListed: false,
        isVegan: false,
        isGlutenFree: true,
        isVegetarian: true,
        isSelected: false,
    },
    {
        id: 6,
        name: "Salt",
        bgColor: "#f0e8c7", // Light cream (Pastel)
        categoria: "Seasoning",
        affinità: ["Potato", "Onion", "Garlic", "Rosemary", "Butter"],
        isBlackListed: false,
        isVegan: true,
        isGlutenFree: true,
        isVegetarian: true,
        isSelected: false,
    },
    {
        id: 7,
        name: "Thyme",
        bgColor: "#c7f0e3", // Light aqua (Pastel)
        categoria: "Herb",
        affinità: ["Onion", "Garlic", "Rosemary", "Olive Oil", "Pepper"],
        isBlackListed: false,
        isVegan: true,
        isGlutenFree: true,
        isVegetarian: true,
        isSelected: false,
    },
    {
        id: 8,
        name: "Olive Oil",
        bgColor: "#f0f0c7", // Light yellowish-green (Pastel)
        categoria: "Oil",
        affinità: ["Garlic", "Rosemary", "Thyme", "Salt", "Pepper"],
        isBlackListed: false,
        isVegan: true,
        isGlutenFree: true,
        isVegetarian: true,
        isSelected: false,
    },
    {
        id: 9,
        name: "Pepper",
        bgColor: "#f0c7dc", // Light pinkish (Pastel)
        categoria: "Seasoning",
        affinità: ["Onion", "Butter", "Thyme", "Olive Oil", "Salt"],
        isBlackListed: false,
        isVegan: true,
        isGlutenFree: true,
        isVegetarian: true,
        isSelected: false,
    },
    {
        id: 10,
        name: "Eggplant",
        bgColor: "#c7c7f0", // Light purple (Pastel)
        categoria: "Vegetable",
        affinità: ["Tomato", "Garlic", "Basil", "Olive Oil", "Parmesan"],
        isBlackListed: false,
        isVegan: true,
        isGlutenFree: true,
        isVegetarian: true,
        isSelected: false,
    },
    {
        id: 11,
        name: "Tomato",
        bgColor: "#f7a8a8", // Light red (Pastel)
        categoria: "Vegetable",
        affinità: ["Basil", "Garlic", "Olive Oil", "Mozzarella", "Salt"],
        isBlackListed: false,
        isVegan: true,
        isGlutenFree: true,
        isVegetarian: true,
        isSelected: false,
    },
    {
        id: 12,
        name: "Basil",
        bgColor: "#c7f0b4", // Light green (Pastel)
        categoria: "Herb",
        affinità: ["Tomato", "Garlic", "Olive Oil", "Parmesan", "Pine Nuts"],
        isBlackListed: false,
        isVegan: true,
        isGlutenFree: true,
        isVegetarian: true,
        isSelected: false,
    },
    {
        id: 13,
        name: "Mozzarella",
        bgColor: "#f0f0f0", // Light gray (Pastel)
        categoria: "Dairy",
        affinità: ["Tomato", "Basil", "Olive Oil", "Parmesan", "Garlic"],
        isBlackListed: false,
        isVegan: false,
        isGlutenFree: true,
        isVegetarian: true,
        isSelected: false,
    },
    {
        id: 14,
        name: "Parmesan",
        bgColor: "#f0e1c7", // Light cream (Pastel)
        categoria: "Dairy",
        affinità: ["Tomato", "Basil", "Olive Oil", "Garlic", "Pasta"],
        isBlackListed: false,
        isVegan: false,
        isGlutenFree: true,
        isVegetarian: true,
        isSelected: false,
    },
    {
        id: 15,
        name: "Pine Nuts",
        bgColor: "#f0e0c7", // Light beige (Pastel)
        categoria: "Nut",
        affinità: ["Basil", "Parmesan", "Garlic", "Olive Oil", "Pasta"],
        isBlackListed: false,
        isVegan: true,
        isGlutenFree: true,
        isVegetarian: true,
        isSelected: false,
    },
    {
        id: 16,
        name: "Lemon",
        bgColor: "#f0f7c7", // Light lemon yellow (Pastel)
        categoria: "Fruit",
        affinità: ["Chicken", "Fish", "Garlic", "Basil", "Olive Oil"],
        isBlackListed: false,
        isVegan: true,
        isGlutenFree: true,
        isVegetarian: true,
        isSelected: false,
    },
    {
        id: 17,
        name: "Cucumber",
        bgColor: "#c7f0f7", // Light cyan (Pastel)
        categoria: "Vegetable",
        affinità: ["Yogurt", "Mint", "Garlic", "Tomato", "Lemon"],
        isBlackListed: false,
        isVegan: true,
        isGlutenFree: true,
        isVegetarian: true,
        isSelected: false,
    },
    {
        id: 18,
        name: "Mint",
        bgColor: "#b4f0c7", // Light mint green (Pastel)
        categoria: "Herb",
        affinità: ["Cucumber", "Yogurt", "Lemon", "Tomato", "Feta"],
        isBlackListed: false,
        isVegan: true,
        isGlutenFree: true,
        isVegetarian: true,
        isSelected: false,
    },
    {
        id: 19,
        name: "Yogurt",
        bgColor: "#f0e1f7", // Light lavender (Pastel)
        categoria: "Dairy",
        affinità: ["Cucumber", "Mint", "Garlic", "Lemon", "Tomato"],
        isBlackListed: false,
        isVegan: false,
        isGlutenFree: true,
        isVegetarian: true,
        isSelected: false,
    },
    {
        id: 20,
        name: "Feta Cheese",
        bgColor: "#e3f0f7", // Light blue (Pastel)
        categoria: "Dairy",
        affinità: ["Tomato", "Cucumber", "Olive Oil", "Mint", "Lemon"],
        isBlackListed: false,
        isVegan: false,
        isGlutenFree: true,
        isVegetarian: true,
        isSelected: false,
    },
    {
        id: 21,
        name: "Spinach",
        bgColor: "#b4f0b4", // Light green (Pastel)
        categoria: "Vegetable",
        affinità: ["Garlic", "Olive Oil", "Feta", "Lemon", "Parmesan"],
        isBlackListed: false,
        isVegan: true,
        isGlutenFree: true,
        isVegetarian: true,
        isSelected: false,
    },
    {
        id: 22,
        name: "Broccoli",
        bgColor: "#c7f7c7", // Light green (Pastel)
        categoria: "Vegetable",
        affinità: ["Garlic", "Lemon", "Parmesan", "Olive Oil", "Salt"],
        isBlackListed: false,
        isVegan: true,
        isGlutenFree: true,
        isVegetarian: true,
        isSelected: false,
    },
    {
        id: 23,
        name: "Carrot",
        bgColor: "#f7c7a3", // Light orange (Pastel)
        categoria: "Vegetable",
        affinità: ["Ginger", "Honey", "Orange", "Cumin", "Salt"],
        isBlackListed: false,
        isVegan: true,
        isGlutenFree: true,
        isVegetarian: true,
        isSelected: false,
    },
    {
        id: 24,
        name: "Ginger",
        bgColor: "#f7c7c1", // Light pinkish orange (Pastel)
        categoria: "Root",
        affinità: ["Carrot", "Honey", "Orange", "Garlic", "Soy Sauce"],
        isBlackListed: false,
        isVegan: true,
        isGlutenFree: true,
        isVegetarian: true,
        isSelected: false,
    },
    {
        id: 25,
        name: "Honey",
        bgColor: "#f7e1c7", // Light honey (Pastel)
        categoria: "Sweetener",
        affinità: ["Carrot", "Ginger", "Orange", "Yogurt", "Mint"],
        isBlackListed: false,
        isVegan: true,
        isGlutenFree: true,
        isVegetarian: true,
        isSelected: false,
    },
    {
        id: 26,
        name: "Orange",
        bgColor: "#f7b4c7", // Light coral (Pastel)
        categoria: "Fruit",
        affinità: ["Carrot", "Ginger", "Honey", "Cinnamon", "Mint"],
        isBlackListed: false,
        isVegan: true,
        isGlutenFree: true,
        isVegetarian: true,
        isSelected: false,
    },
    {
        id: 27,
        name: "Cinnamon",
        bgColor: "#e3b4a3", // Light brown (Pastel)
        categoria: "Spice",
        affinità: ["Orange", "Honey", "Apple", "Yogurt", "Almond"],
        isBlackListed: false,
        isVegan: true,
        isGlutenFree: true,
        isVegetarian: true,
        isSelected: false,
    },
    {
        id: 28,
        name: "Apple",
        bgColor: "#f7c7c7", // Light pinkish (Pastel)
        categoria: "Fruit",
        affinità: ["Cinnamon", "Yogurt", "Almond", "Honey", "Lemon"],
        isBlackListed: false,
        isVegan: true,
        isGlutenFree: true,
        isVegetarian: true,
        isSelected: false,
    },
    {
        id: 29,
        name: "Almond",
        bgColor: "#f0e0c7", // Light beige (Pastel)
        categoria: "Nut",
        affinità: ["Apple", "Cinnamon", "Honey", "Yogurt", "Oats"],
        isBlackListed: false,
        isVegan: true,
        isGlutenFree: true,
        isVegetarian: true,
        isSelected: false,
    },
    {
        id: 31,
        name: "Banana",
        bgColor: "#f0f7c7", // Light yellow-green (Pastel)
        categoria: "Fruit",
        affinità: ["Oats", "Honey", "Yogurt", "Almond", "Cinnamon"],
        isBlackListed: false,
        isVegan: true,
        isGlutenFree: true,
        isVegetarian: true,
        isSelected: false,
    },
    {
        id: 32,
        name: "Avocado",
        bgColor: "#c7f7b4", // Light avocado green (Pastel)
        categoria: "Fruit",
        affinità: ["Lime", "Cilantro", "Tomato", "Red Onion", "Garlic"],
        isBlackListed: false,
        isVegan: true,
        isGlutenFree: true,
        isVegetarian: true,
        isSelected: false,
    },
    {
        id: 33,
        name: "Lime",
        bgColor: "#b4f0c7", // Light lime green (Pastel)
        categoria: "Fruit",
        affinità: ["Avocado", "Cilantro", "Tomato", "Red Onion", "Garlic"],
        isBlackListed: false,
        isVegan: true,
        isGlutenFree: true,
        isVegetarian: true,
        isSelected: false,
    },
    {
        id: 34,
        name: "Cilantro",
        bgColor: "#c7f0f7", // Light sky blue (Pastel)
        categoria: "Herb",
        affinità: ["Avocado", "Lime", "Tomato", "Red Onion", "Garlic"],
        isBlackListed: false,
        isVegan: true,
        isGlutenFree: true,
        isVegetarian: true,
        isSelected: false,
    },
    {
        id: 35,
        name: "Red Onion",
        bgColor: "#f7c7c7", // Light pink (Pastel)
        categoria: "Vegetable",
        affinità: ["Avocado", "Lime", "Cilantro", "Tomato", "Garlic"],
        isBlackListed: false,
        isVegan: true,
        isGlutenFree: true,
        isVegetarian: true,
        isSelected: false,
    },
    {
        id: 36,
        name: "Chicken",
        bgColor: "#f0dfc7", // Light beige (Pastel)
        categoria: "Meat",
        affinità: ["Lemon", "Garlic", "Rosemary", "Thyme", "Olive Oil"],
        isBlackListed: false,
        isVegan: false,
        isGlutenFree: true,
        isVegetarian: false,
        isSelected: false,
    },
    {
        id: 37,
        name: "Beef",
        bgColor: "#f7e1c7", // Light peach (Pastel)
        categoria: "Meat",
        affinità: ["Garlic", "Thyme", "Rosemary", "Red Wine", "Potato"],
        isBlackListed: false,
        isVegan: false,
        isGlutenFree: true,
        isVegetarian: false,
        isSelected: false,
    },
    {
        id: 38,
        name: "Pork",
        bgColor: "#f0e1f7", // Light lavender (Pastel)
        categoria: "Meat",
        affinità: ["Apple", "Garlic", "Rosemary", "Thyme", "Onion"],
        isBlackListed: false,
        isVegan: false,
        isGlutenFree: true,
        isVegetarian: false,
        isSelected: false,
    },
    {
        id: 39,
        name: "Salmon",
        bgColor: "#f0e8c7", // Light cream (Pastel)
        categoria: "Fish",
        affinità: ["Lemon", "Dill", "Garlic", "Olive Oil", "Asparagus"],
        isBlackListed: false,
        isVegan: false,
        isGlutenFree: true,
        isVegetarian: false,
        isSelected: false,
    },
    {
        id: 40,
        name: "Dill",
        bgColor: "#c7f0da", // Light seafoam green (Pastel)
        categoria: "Herb",
        affinità: ["Salmon", "Lemon", "Garlic", "Cucumber", "Potato"],
        isBlackListed: false,
        isVegan: true,
        isGlutenFree: true,
        isVegetarian: true,
        isSelected: false,
    },
    {
        id: 41,
        name: "Asparagus",
        bgColor: "#c7f7c7", // Light celery green (Pastel)
        categoria: "Vegetable",
        affinità: ["Salmon", "Lemon", "Garlic", "Olive Oil", "Potato"],
        isBlackListed: false,
        isVegan: true,
        isGlutenFree: true,
        isVegetarian: true,
        isSelected: false,
    },
    {
        id: 42,
        name: "Quinoa",
        bgColor: "#f7c7a3", // Light peach (Pastel)
        categoria: "Grain",
        affinità: ["Black Beans", "Bell Pepper", "Cilantro", "Lime", "Avocado"],
        isBlackListed: false,
        isVegan: true,
        isGlutenFree: true,
        isVegetarian: true,
        isSelected: false,
    },
    {
        id: 43,
        name: "Black Beans",
        bgColor: "#b4f0c7", // Light mint green (Pastel)
        categoria: "Legume",
        affinità: ["Quinoa", "Bell Pepper", "Cilantro", "Lime", "Avocado"],
        isBlackListed: false,
        isVegan: true,
        isGlutenFree: true,
        isVegetarian: true,
        isSelected: false,
    },
    {
        id: 44,
        name: "Bell Pepper",
        bgColor: "#c7f0f7", // Light sky blue (Pastel)
        categoria: "Vegetable",
        affinità: ["Quinoa", "Black Beans", "Cilantro", "Lime", "Avocado"],
        isBlackListed: false,
        isVegan: true,
        isGlutenFree: true,
        isVegetarian: true,
        isSelected: false,
    },
    {
        id: 45,
        name: "Tofu",
        bgColor: "#f0e0c7", // Light beige (Pastel)
        categoria: "Protein",
        affinità: ["Soy Sauce", "Ginger", "Garlic", "Scallion", "Broccoli"],
        isBlackListed: false,
        isVegan: true,
        isGlutenFree: true,
        isVegetarian: true,
        isSelected: false,
    },
    {
        id: 46,
        name: "Soy Sauce",
        bgColor: "#d7f0c7", // Light celery green (Pastel)
        categoria: "Condiment",
        affinità: ["Tofu", "Ginger", "Garlic", "Scallion", "Broccoli"],
        isBlackListed: false,
        isVegan: true,
        isGlutenFree: false,
        isVegetarian: true,
        isSelected: false,
    },
    {
        id: 47,
        name: "Scallion",
        bgColor: "#f7c7a3", // Light peach (Pastel)
        categoria: "Vegetable",
        affinità: ["Tofu", "Soy Sauce", "Ginger", "Garlic", "Broccoli"],
        isBlackListed: false,
        isVegan: true,
        isGlutenFree: true,
        isVegetarian: true,
        isSelected: false,
    },
    {
        id: 48,
        name: "Rice",
        bgColor: "#b4f0c7", // Light mint green (Pastel)
        categoria: "Grain",
        affinità: ["Chicken", "Soy Sauce", "Ginger", "Broccoli", "Carrot"],
        isBlackListed: false,
        isVegan: true,
        isGlutenFree: true,
        isVegetarian: true,
        isSelected: false,
    },
    {
        id: 49,
        name: "Pasta",
        bgColor: "#c7f0f7", // Light sky blue (Pastel)
        categoria: "Grain",
        affinità: ["Tomato", "Basil", "Parmesan", "Olive Oil", "Garlic"],
        isBlackListed: false,
        isVegan: false,
        isGlutenFree: false,
        isVegetarian: true,
        isSelected: false,
    },
    {
        id: 51,
        name: "Shrimp",
        bgColor: "#f0e8c7", // Light cream (Pastel)
        categoria: "Seafood",
        affinità: ["Garlic", "Lemon", "Butter", "Pasta", "Chili Flakes"],
        isBlackListed: false,
        isVegan: false,
        isGlutenFree: true,
        isVegetarian: false,
        isSelected: false,
    },
    {
        id: 52,
        name: "Chili Flakes",
        bgColor: "#f7c7a3", // Light peach (Pastel)
        categoria: "Seasoning",
        affinità: ["Garlic", "Tomato", "Pasta", "Shrimp", "Olive Oil"],
        isBlackListed: false,
        isVegan: true,
        isGlutenFree: true,
        isVegetarian: true,
        isSelected: false,
    },
    {
        id: 53,
        name: "Coconut Milk",
        bgColor: "#c7f0f7", // Light sky blue (Pastel)
        categoria: "Dairy Alternative",
        affinità: ["Curry Paste", "Ginger", "Garlic", "Lemongrass", "Tofu"],
        isBlackListed: false,
        isVegan: true,
        isGlutenFree: true,
        isVegetarian: true,
        isSelected: false,
    },
    {
        id: 54,
        name: "Curry Paste",
        bgColor: "#b4f0c7", // Light mint green (Pastel)
        categoria: "Seasoning",
        affinità: ["Coconut Milk", "Ginger", "Garlic", "Lemongrass", "Vegetables"],
        isBlackListed: false,
        isVegan: true,
        isGlutenFree: true,
        isVegetarian: true,
        isSelected: false,
    },
    {
        id: 55,
        name: "Lemongrass",
        bgColor: "#c7f7c7", // Light celery green (Pastel)
        categoria: "Herb",
        affinità: ["Coconut Milk", "Curry Paste", "Ginger", "Garlic", "Vegetables"],
        isBlackListed: false,
        isVegan: true,
        isGlutenFree: true,
        isVegetarian: true,
        isSelected: false,
    },
   
    {
        id: 69,
        name: "Pineapple",
        bgColor: "#f7c7c7", // Light coral (Pastel)
        categoria: "Fruit",
        affinità: ["Coconut Milk", "Mint", "Basil", "Lime", "Ginger"],
        isBlackListed: false,
        isVegan: true,
        isGlutenFree: true,
        isVegetarian: true,
        isSelected: false,
    },
]

export default ingredientsArray
