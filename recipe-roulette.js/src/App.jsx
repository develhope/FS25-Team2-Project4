import { Link, Route, Routes } from "react-router-dom"
import Discovery from "./pages/Discovery/Discovery"
import Favorited from "./pages/Favorited/Favorited"
import Settings from "./pages/Settings/Settings"
import RecipeResults from "./pages/RecipesResults/RecipesResults"
import {Login} from "./components/authentication/login/Login"

function App() {
    return (
        <div className="appContainer">
            <Routes>
                <Route path="/" element={<Discovery />} />
                <Route path="/favorited" element={<Favorited />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/recipes-results" element={<RecipeResults />}>
                    <Route path="./:recipeName" element="RecipePage" />
                </Route>
                <Route path="/login" element={<Login/>} />
            </Routes>
            
            <div className="bottomNav">
                <Link className="pageLink" to="./">
                    Discovery
                </Link>
                <Link className="pageLink" to="./favorited">
                    Favorited
                </Link>
                <Link className="pageLink" to="./settings">
                    Settings
                </Link>
                <Link className="pageLink" to="./recipes-results">
                    Recipe Results
                </Link>
            </div>
        </div>
    )
}

export default App
