import { Link, Route, Routes, useLocation } from "react-router-dom"
import { useState, useEffect } from "react"

import Discovery from "./pages/Discovery/Discovery"
import Favorited from "./pages/Favorited/Favorited"
import { Settings } from "./pages/Settings/Settings"
import RecipeResults from "./pages/RecipesResults/RecipesResults"
import { Login } from "./components/authentication/login/Login"
import { Signup } from "./components/authentication/signup/Signup"
import { IngredientsProvider } from "./pages/Discovery/IngredientsContext"
import { Sidebar } from "./components/Sidebar/Sidebar"
import { SideMenu } from "./components/SideMenu/SideMenu"
import { Header } from "./components/Header/Header"
import { useDiscoverySidebar } from "./hooks/DiscoverySidebar/useDiscoverySidebar"
import { useSideMenu } from "./hooks/SideMenu/useSideMenu"

function App() {
    const { handleSidebarToggle, sidebarState } = useDiscoverySidebar()
    const { handleMenuToggle, path, menuState } = useSideMenu()

    return (
        <div className="appContainer">
            <IngredientsProvider>
                <Sidebar sidebarState={sidebarState} handleSidebarToggle={handleSidebarToggle} />
                <Header handleMenuToggle={handleMenuToggle} sidebarState={sidebarState} />
                <Routes>
                    <Route path="/" element={<Discovery handleSidebarToggle={handleSidebarToggle} />} />
                    <Route path="/favorited" element={<Favorited />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/recipes-results" element={<RecipeResults />}>
                        <Route path="./:recipeName" element="RecipePage" />
                    </Route>

                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                </Routes>
            </IngredientsProvider>

            <SideMenu handleMenuToggle={handleMenuToggle} menuState={menuState} path={path} />

            {/*             <div className="bottomNav">
                <Link className="pageLink" to="./">
                    Discovery
                </Link>
                <Link className="pageLink" to="./favorited">
                    Favorited
                </Link>
                <Link className="pageLink" to="./settings">
                    Settings
                </Link>
            </div> */}
        </div>
    )
}

export default App
