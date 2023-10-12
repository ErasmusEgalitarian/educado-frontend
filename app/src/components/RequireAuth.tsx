import { type ReactNode } from 'react'
import { useLocation, Navigate } from 'react-router-dom'

// contexts
import useAuthStore from '../contexts/useAuthStore'

const RequireAuth = ({ children }: { children: ReactNode[] | ReactNode }) => {
  const accessToken = useAuthStore(async state => state.getToken)
  const location = useLocation()

  if (!accessToken) {
    return <Navigate to="/login" state={{ from: location }} replace={true} />
  }

  return <>{children}</>
}

export default RequireAuth
