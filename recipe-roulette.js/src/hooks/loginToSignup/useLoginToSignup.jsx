import { useState } from "react"

export function useLoginToSignup() {
    const [changeToSignup, setChangeToSignup] = useState()

    return { changeToSignup, setChangeToSignup }
}
