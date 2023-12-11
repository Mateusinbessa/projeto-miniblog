import { useEffect, useState } from "react"
import { useAuthentication } from "../../hooks/useAuthentication"

import styles from "./Login.module.css"

const Login = () => {

  const [email, setEmail] = useState("")
  const [password, setPassWord] = useState("")
  const [error, setError] = useState("")

  const { createUser, error: authError, loading } = useAuthentication()

  const handleSubmit = async (e) => {
    e.preventDefault()

    setError("")

    const user = {
      displayName,
      email,
      password
    }

    const res = await createUser(user)

  }

  //mapeando authError, pra sempre que ele receber um valor eu colocar essa valor no meu state de erro!
  useEffect(() => {
    if (authError) {
      setError(authError)
    }
  }, [authError])


  return (
    <div className={styles.login}>
      <h1>Entrar</h1>
      <p>Faça o login para poder utilizar o sitesma</p>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Email:</span>
          <input
            type="email"
            name="email"
            required
            placeholder="E-mail do usuário"
            value={email}
            onChange={(e) => setEmail(e.target.value)} />
        </label>

        <label>
          <span>Senha:</span>
          <input
            type="password"
            name="password"
            required
            placeholder="Insira sua senha"
            value={password}
            onChange={(e) => setPassWord(e.target.value)} />
        </label>

        {!loading && <button className="btn">Entrar</button>}
        {loading && <button className="btn" disabled>Aguarde...</button>}
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  )
}

export default Login