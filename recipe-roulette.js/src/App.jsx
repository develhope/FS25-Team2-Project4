import { Route, Routes } from "react-router-dom"
import { DiscoveryPreview } from "./pages/DiscoveryPreview/DiscoveryPreview"
import { Discovery } from "./pages/Discovery/Discovery"
import { Favorited } from "./pages/Favorited/Favorited"
import { Preferences } from "./pages/Preferences/Preferences"
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
import { NotFound404 } from "./pages/NotFound404/NotFound404"
import { Snackbar } from "./components/Snackbar/Snackbar"
import { RecipesFetchProvider } from "./hooks/recipesFetch/useRecipesFetch"

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
                            <RecipesFetchProvider>
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
                                    <Route path="/sidebarRecipes" element={<SideBarRecipes />} />
                                    <Route path="/food-preferences" element={<Preferences />} />
                                    <Route path="/*" element={<NotFound404 />} />
                                </Routes>
                              <Snackbar/>
                            </RecipesFetchProvider>
                        </SnackbarProvider>
                    </RecipesProvider>
                </IngredientsProvider>
            </AuthProvider>
        </div>
    )
}

export default App
