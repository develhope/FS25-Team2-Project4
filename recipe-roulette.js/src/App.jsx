import { Route, Routes } from "react-router-dom"
import { DiscoveryPreview } from "./pages/DiscoveryPreview/DiscoveryPreview"
import { Discovery } from "./pages/Discovery/Discovery"
import { Favorited } from "./pages/Favorited/Favorited"
import { Settings } from "./pages/Settings/Settings"
import { RecipeResults } from "./pages/RecipesResults/RecipesResults"
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
import { RecipesProvider } from "./contexts/RecipesContext"
import { LoginPage } from "./pages/Login/LoginPage"
import { SignupPage } from "./pages/Signup/SignupPage"

function App() {
    const { handleSidebarToggle, sidebarState } = useDiscoverySidebar()
    const { handleMenuToggle, path, menuState } = useSideMenu()
    const { toggleSidebarRecipes, sideBarState } = useRecipesResultsSideBar()

    return (
        <div className="appContainer">
            <AuthProvider>
                <IngredientsProvider>
                    <RecipesProvider>
                        <SnackbarProvider>
                            <SideMenu handleMenuToggle={handleMenuToggle} menuState={menuState} path={path} />
                            <SideBarRecipes state={sideBarState} toggleSidebarRecipes={toggleSidebarRecipes} />
                            <Sidebar sidebarState={sidebarState} handleSidebarToggle={handleSidebarToggle} />

                            <Header
                                handleRecipesSidebarToggle={toggleSidebarRecipes}
                                handleSidebarToggle={handleSidebarToggle}
                                handleMenuToggle={handleMenuToggle}
                            />
                            <Routes classes>
                                <Route path="/" element={<DiscoveryPreview />} />
                                <Route path="/discovery" element={<Discovery handleSidebarToggle={handleSidebarToggle} />} />
                                <Route
                                    path="/favorited"
                                    element={<Favorited handleRecipesSidebarToggle={toggleSidebarRecipes} />}
                                />
                                <Route path="/settings" element={<Settings />} />
                                <Route
                                    path="/recipes-results"
                                    element={<RecipeResults handleRecipesSidebarToggle={toggleSidebarRecipes} />}
                                />
                                <Route path={`/recipe`} element={<Recipe />} />

                                <Route path="/login" element={<LoginPage />} />
                                <Route path="/signup" element={<SignupPage />} />
                                <Route path="/sidebarRecipes" element={<SideBarRecipes />} />
                                <Route path="/*" element={<h1>Page not found (creare pagina placeholder)</h1>} />
                            </Routes>
                        </SnackbarProvider>
                    </RecipesProvider>
                </IngredientsProvider>
            </AuthProvider>
        </div>
    )
}

export default App
