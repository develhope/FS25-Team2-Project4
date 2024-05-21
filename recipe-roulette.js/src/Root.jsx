import { BrowserRouter } from "react-router-dom"
import 'react-material-symbols/rounded'

import App from "./App"

export function Root() {
    return (
        <BrowserRouter>
            <App />
        </BrowserRouter>
    )
}
