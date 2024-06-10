import { useState } from "react"
import { useAuth } from "../Auth/useAuth"
import { useLogin } from "./useLogin"

export function useSignup() {
    const [data, setData] = useState(createData())
    const [passError, setPassError] = useState(null)

    //ho importato questi per settare nel localStorage i dati dell'utente ed effettuare l'accesso
    const { setItem } = useLogin()
    const { login } = useAuth()

    function createData() {
        return {
            username: ``,
            email: ``,
            password: ``,
            confirmPass: ``,
            check: false,
        }
    }

    function handleInput(e) {
        const name = e.target.name
        const value = e.target.value
        const checked = e.target.checked
        const type = e.target.type

        setData((d) => {
            return {
                ...d,
                [name]: type === `checkbox` ? checked : value,
            }
        })
    }

    function handleSubmit(e) {
        e.preventDefault()
        console.log(data)
        if (data.password === data.confirmPass && data.check) {
            setItem(data)
            login()
        } else {
            console.log("Please, confirm your password correctly")
            setPassError(`Please, confirm your password correctly`)
        }
    }

    return {
        data,
        passError,
        handleInput,
        handleSubmit,
    }
}