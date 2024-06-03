import { Route, Routes } from "react-router-dom"

import { DiscoveryPreview } from "./pages/DiscoveryPreview/DiscoveryPreview"
import { Discovery } from "./pages/Discovery/Discovery"
import { Favorited } from "./pages/Favorited/Favorited"
import { Settings } from "./pages/Settings/Settings"
import { RecipeResults } from "./pages/RecipesResults/RecipesResults"
import { Login } from "./components/authentication/login/Login"
import { Signup } from "./components/authentication/signup/Signup"
import { IngredientsProvider } from "./pages/Discovery/IngredientsContext"
import { Sidebar } from "./components/Sidebar/Sidebar"
import { SideMenu } from "./components/SideMenu/SideMenu"
import { Header } from "./components/Header/Header"
import { useDiscoverySidebar } from "./hooks/DiscoverySidebar/useDiscoverySidebar"
import { useSideMenu } from "./hooks/SideMenu/useSideMenu"
import { SnackbarProvider } from "./components/Snackbar/useSnackbar"
import { SideBarRecipes } from "./components/Sidebar/SideBarRecipes"
import { useRecipesResultsSideBar } from "./hooks/RecipesResultsSideBar/useRecipesResultsSideBar"
import { AuthProvider } from "./components/authentication/AuthContext"
import { Recipe } from "./pages/Recipe/Recipe"
/* import { useEffect } from "react"
import { useNavigate } from "react-router-dom" */

function App() {
    const { handleSidebarToggle, sidebarState } = useDiscoverySidebar()
    const { handleMenuToggle, path, menuState } = useSideMenu()
    const { toggleSidebarRecipes, sideBarState } = useRecipesResultsSideBar()
    /* const navigate = useNavigate() */
    /* 
    useEffect(() => {
        navigate("/")
    }, []) */

    return (
        <div className="appContainer">
            <AuthProvider>
            <IngredientsProvider>
                <SnackbarProvider>
                    <SideMenu handleMenuToggle={handleMenuToggle} menuState={menuState} path={path} />
                    <SideBarRecipes state={sideBarState} toggleSidebarRecipes={toggleSidebarRecipes} />
                    <Sidebar sidebarState={sidebarState} handleSidebarToggle={handleSidebarToggle} />

                    <Header
                        handleMenuToggle={handleMenuToggle}
                    />

                    <Routes>
                        <Route path="/" element={<DiscoveryPreview />} />
                        <Route path="/discovery" element={<Discovery handleSidebarToggle={handleSidebarToggle} />} />
                        <Route path="/favorited" element={<Favorited handleRecipesSidebarToggle={toggleSidebarRecipes}/>} />
                        <Route path="/settings" element={<Settings />} />
                        <Route path="/recipes-results" element={<RecipeResults handleRecipesSidebarToggle={toggleSidebarRecipes}/>}>
                            <Route path={`./:${"recipe.title"}`} element={<Recipe/>} />
                        </Route>

                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<Signup />} />
                        <Route path="/sidebarRecipes" element={<SideBarRecipes />} />
                    </Routes>
                </SnackbarProvider>
            </IngredientsProvider>
            </AuthProvider>
        </div>
    )
}

export default App
