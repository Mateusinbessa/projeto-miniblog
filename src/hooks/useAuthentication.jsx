import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    signOut
} from "firebase/auth"
import { useState } from "react"

export const useAuthentication = () => {
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(null)

    //cleanup
    //deal with memory leak
    const [cancelled, setCancelled] = useState(false)

    //Eu consigo utilizar funções de autenticação a partir desse cara.
    const auth = getAuth()

    function checkIfIsCancelled() {
        if(cancelled) {
            return
        }
    }
}