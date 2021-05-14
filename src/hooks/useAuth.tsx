import "firebase/auth"

import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react"

import firebase, { auth } from "../firebase"

type Auth = ReturnType<typeof useAuthProvider>

const mockFn = (): Promise<any> =>
  new Promise(resolve => resolve(console.warn("no theme provider")))

const AuthContext = createContext<Auth>({
  user: null,
  login: mockFn,
  logout: mockFn,
  register: mockFn,
  sendPasswordResetEmail: mockFn,
  confirmPasswordReset: mockFn,
})

// Provider component that wraps your app and makes auth object ...
// ... available to any child component that calls useAuth().
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const auth = useAuthProvider()
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
}

// Hook for child components to get the auth object ...
// ... and re-render when it changes.
export const useAuth = () => {
  return useContext(AuthContext)
}

// Provider hook that creates auth object and handles state
export default function useAuthProvider() {
  const [user, setUser] = useState<firebase.User | null>(null)

  // Wrap any Firebase methods we want to use making sure ...
  // ... to save the user to state.
  const login = (email: string, password: string) => {
    return auth.signInWithEmailAndPassword(email, password).then(res => {
      setUser(res.user)
      return res.user
    })
  }

  const register = (email: string, password: string) => {
    return auth.createUserWithEmailAndPassword(email, password).then(res => {
      setUser(res.user)
      return res.user
    })
  }

  const logout = () => {
    return auth.signOut().then(res => {
      setUser(null)
    })
  }

  const sendPasswordResetEmail = async (email: string) => {
    return auth.sendPasswordResetEmail(email).then(res => true)
  }

  const confirmPasswordReset = async (code: string, password: string) => {
    return auth.confirmPasswordReset(code, password).then(res => true)
  }

  // Subscribe to user on mount
  // Because this sets state in the callback it will cause any ...
  // ... component that utilizes this hook to re-render with the ...
  // ... latest auth object.
  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      setUser(user)
    })

    // Cleanup subscription on unmount
    return () => unsubscribe()
  }, [])

  // Return the user object and auth methods
  return {
    user,
    login,
    logout,
    register,
    sendPasswordResetEmail,
    confirmPasswordReset,
  }
}
