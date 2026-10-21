import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { User, type UserRole } from '../domain/User';
import { authService } from '../services/auth/AuthService';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  isAuthModalOpen: boolean;
  authModalDefaultTab: 'login' | 'register';
  openAuthModal: (defaultTab?: 'login' | 'register') => void;
  closeAuthModal: () => void;
  loginWithEmail: (email: string, password: string) => Promise<User>;
  registerWithEmail: (name: string, email: string, password: string, role?: UserRole) => Promise<User>;
  loginAsDemo: (rolePreset: 'admin' | 'docente' | 'usuario') => Promise<User>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(authService.getCurrentUser());
  const [loading, setLoading] = useState<boolean>(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [authModalDefaultTab, setAuthModalDefaultTab] = useState<'login' | 'register'>('login');

  useEffect(() => {
    const unsubscribe = authService.onAuthStateChanged((newUser) => {
      setUser(newUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const openAuthModal = (defaultTab: 'login' | 'register' = 'login') => {
    setAuthModalDefaultTab(defaultTab);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  const loginWithEmail = async (email: string, password: string): Promise<User> => {
    const logged = await authService.loginWithEmail(email, password);
    setUser(logged);
    closeAuthModal();
    return logged;
  };

  const registerWithEmail = async (
    name: string,
    email: string,
    password: string,
    role: UserRole = 'usuario'
  ): Promise<User> => {
    const registered = await authService.registerWithEmail(name, email, password, role);
    setUser(registered);
    closeAuthModal();
    return registered;
  };

  const loginAsDemo = async (rolePreset: 'admin' | 'docente' | 'usuario'): Promise<User> => {
    const demoUser = await authService.loginAsDemo(rolePreset);
    setUser(demoUser);
    closeAuthModal();
    return demoUser;
  };

  const logout = async (): Promise<void> => {
    await authService.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: Boolean(user),
        loading,
        isAuthModalOpen,
        authModalDefaultTab,
        openAuthModal,
        closeAuthModal,
        loginWithEmail,
        registerWithEmail,
        loginAsDemo,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser utilizado dentro de un AuthProvider');
  }
  return context;
}
