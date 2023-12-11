import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    signOut
} from "firebase/auth"

import { db } from "../firebase/config"

import { useEffect, useState } from "react"

export const useAuthentication = () => {
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(null)

    //cleanup
    //deal with memory leak
    const [cancelled, setCancelled] = useState(false)

    //Eu consigo utilizar funções de autenticação a partir desse cara.
    const auth = getAuth()

    function checkIfIsCancelled() {
        if (cancelled) {
            return
        }
    }

    //register
    const createUser = async (data) => {
        checkIfIsCancelled()

        setLoading(true)
        setError(null)

        //essa aqui é a estrutura do firebase pra criação de um user, é irrelevante pq a gente que vai criar nossa própria API futuramente.
        //no firebase eu não posso criar um usuário com um nome, tenho que criar somente com email e senha e depois dar um update nele.
        try {
            const { user } = await createUserWithEmailAndPassword(
                auth,
                data.email,
                data.password
            )

            await updateProfile(user, {
                displayName: data.displayName
            })

            setLoading(false)
            return user
        } catch (error) {
            console.log(error.message)
            let systemErrorMessage

            if (error.message.includes("Password")) {
                systemErrorMessage = "A senha precisa conter pelo menos 6 caractéres"
            } else if (error.message.includes("email-already")) {
                systemErrorMessage = "E-mail já cadastrado"
            } else {
                systemErrorMessage = "Ocorreu um erro, por favor tente mais tarde"
            }
            setError(systemErrorMessage)
        }
    }

    //logout
    const logout = () => {
        checkIfIsCancelled()
        signOut(auth)
    }

    //login
    const login = async (data) => {

        checkIfIsCancelled()

        setLoading(true)
        setError(false)

        try {
            signInWithEmailAndPassword(auth, data.email, data.password)
            setLoading(false)
        } catch (error) {
            let systemErrorMessage

            if (error.message.includes("user-not-found")) {
                systemErrorMessage = "Usuário não encontrado!"
            } else if (error.message.includes("wrong-password")) {
                systemErrorMessage = "Senha incorreta!"
            } else {
                systemErrorMessage = "Ocorreu o erro, por favor tente mais tarde!"
            }
            setError(systemErrorMessage)
            setLoading(false)
        }
    }

    useEffect(() => {
        return () => setCancelled(true)
    }, [])

    return {
        auth,
        createUser,
        error,
        loading,
        logout,
        login
    }
}