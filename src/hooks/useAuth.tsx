import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react"

import { auth, db } from "~/firebase"
import { User } from "~/models/User"

type Auth = ReturnType<typeof useAuthProvider>

export interface AuthCredentials {
  email: string
  password: string
}

export interface RegisterProps extends Omit<User, "uid"> {
  password: string
}

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
  const [user, setUser] = useState<User | null>(null)

  const login = ({ email, password }: AuthCredentials) => {
    return auth.signInWithEmailAndPassword(email, password)
  }

  const register = ({ email, password, ...userDetails }: RegisterProps) => {
    return auth.createUserWithEmailAndPassword(email, password).then(() => {
      if (!auth.currentUser) return

      const user: User = {
        ...userDetails,
        uid: auth.currentUser.uid,
        email,
      }

      // Once the user creation has happened successfully,
      // we can add the currentUser into firestore
      db.users
        .doc(user.uid)
        .set(user)
        .then(() => setUser(user))
        .catch(error => {
          console.log(
            "Something went wrong with added user to firestore: ",
            error
          )
        })
    })
  }

  const logout = () => {
    return auth.signOut().then(() => setUser(null))
  }

  const sendPasswordResetEmail = (email: string) => {
    return auth.sendPasswordResetEmail(email)
  }

  const confirmPasswordReset = (code: string, password: string) => {
    return auth.confirmPasswordReset(code, password)
  }

  // Subscribe to user on mount
  // Because this sets state in the callback it will cause any ...
  // ... component that utilizes this hook to re-render with the ...
  // ... latest auth object.
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(firebaseUser => {
      if (firebaseUser) {
        db.users
          .doc(firebaseUser.uid)
          .get()
          .then(doc => setUser(doc.data() || null))
          .catch(error => {
            console.error(error)
            setUser(null)
          })
      } else {
        setUser(null)
      }
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
