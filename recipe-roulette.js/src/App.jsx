import { Link, Route, Router, Routes } from "react-router-dom"
import RecipeCard from "./components/authentication/RecipeCard"

function App() {
    return (
        <div>
          <Link to="/">Discovery</Link>
          <Link to="/favorited">Favorited</Link>
          <Link to="/settings">Settings</Link>
          
            <Routes>
                <Route path="/" element="{<Discovery />}" />
                <Route path="favorited" element="{<Favorited />}" />
                <Route path="settings" element="{<Settings />}" />
            </Routes>

            <Routes>
                <Route path="recipe" element={<RecipeCard />} />
                <Route path=":recipe" element="RecipePage" />
            </Routes>
        </div>
    )
}

export default App
