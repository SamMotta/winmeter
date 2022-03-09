import { createContext, useState, useEffect, ReactNode } from 'react';
import { auth, firebase } from '../services/firebase';

type UserType = {
    id: string;
    name: string;
    avatar: string;
}

type AuthContextType = {
    user: UserType | undefined;
    signInWithGoogle: () => Promise<void>;
}

type AuthContextProviderProps = {
    children: ReactNode;
}

/* useEffect dispara uma função, sempre que algo acontecer */

export const AuthContext = createContext({} as AuthContextType)

export function AuthContextProvider(props: AuthContextProviderProps) {

      // [estado atual, função para alterar o estado] = useState('estadoInicial')
  const [user, setUser] = useState<UserType>()

  // dispara a função sempre que o user mudar
  /* useEffect(() => {
    console.log('WAU')
  }, [user]) */

  // Dispara uma única vez quando App for renderizado
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        const { displayName, photoURL, uid } = user
  
        if (!displayName || !photoURL) {
          throw new Error('Missing Information from Google Account.')
        }
  
        setUser({
          id: uid,
          name: displayName,
          avatar: photoURL,
        })
      }

      // Para parar de "ouvir" o evento -> Boa prática
      return () => {
        unsubscribe()
      }
    })
  }, [])

  async function signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider()

    const result = await auth.signInWithPopup(provider)

    if (result.user) {
      const { displayName, photoURL, uid } = result.user

      if (!displayName || !photoURL) {
        throw new Error('Missing Information from Google Account.')
      }

      setUser({
        id: uid,
        name: displayName,
        avatar: photoURL,
      })
    }
  }


    return (
        <AuthContext.Provider value={{ user, signInWithGoogle }}>
            {props.children}
        </AuthContext.Provider>

    );
}