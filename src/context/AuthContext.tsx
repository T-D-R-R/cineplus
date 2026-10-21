import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { User } from '../domain/User';
import { authService } from '../services/auth/AuthService';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  isAuthModalOpen: boolean;
  authModalDefaultTab: 'login' | 'register' | 'forgot-password';
  openAuthModal: (defaultTab?: 'login' | 'register' | 'forgot-password') => void;
  closeAuthModal: () => void;
  loginWithEmail: (email: string, password: string) => Promise<User>;
  registerWithEmail: (name: string, email: string, password: string, phone?: string) => Promise<User>;
  logout: () => Promise<void>;
  requestPasswordReset: (identifier: string) => Promise<{
    success: boolean;
    email: string;
    user: User;
    hasTelegram: boolean;
    phone?: string;
    message: string;
  }>;
  sendOtpViaTelegram: (email: string) => Promise<{
    success: boolean;
    message: string;
    otpSent?: boolean;
    deepLink?: string;
  }>;
  sendOtpViaEmail: (email: string) => Promise<{
    success: boolean;
    isSimulation: boolean;
    simulationCode?: string;
    message: string;
  }>;
  verifyOtp: (email: string, code: string) => boolean;
  resetPassword: (email: string, newPassword: string, code: string) => Promise<boolean>;
  linkTelegramAccount: (userId: string, chatId: string | number, username?: string) => Promise<boolean>;
  checkAndSyncTelegram: () => Promise<{ linked: boolean; message: string }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(authService.getCurrentUser());
  const [loading, setLoading] = useState<boolean>(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [authModalDefaultTab, setAuthModalDefaultTab] = useState<'login' | 'register' | 'forgot-password'>('login');

  useEffect(() => {
    const unsubscribe = authService.onAuthStateChanged((newUser) => {
      setUser(newUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const openAuthModal = (defaultTab: 'login' | 'register' | 'forgot-password' = 'login') => {
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
    phone?: string
  ): Promise<User> => {
    const registered = await authService.registerWithEmail(name, email, password, phone);
    setUser(registered);
    closeAuthModal();
    return registered;
  };

  const logout = async (): Promise<void> => {
    await authService.logout();
    setUser(null);
  };

  const requestPasswordReset = async (identifier: string) => {
    return authService.requestPasswordReset(identifier);
  };

  const sendOtpViaTelegram = async (email: string) => {
    return authService.sendOtpViaTelegram(email);
  };

  const sendOtpViaEmail = async (email: string) => {
    return authService.sendOtpViaEmail(email);
  };

  const verifyOtp = (email: string, code: string) => {
    return authService.verifyOtp(email, code);
  };

  const resetPassword = async (email: string, newPassword: string, code: string) => {
    return authService.resetPassword(email, newPassword, code);
  };

  const linkTelegramAccount = async (userId: string, chatId: string | number, username?: string) => {
    return authService.linkTelegramAccount(userId, chatId, username);
  };

  const checkAndSyncTelegram = async () => {
    return authService.checkAndSyncTelegram();
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
        logout,
        requestPasswordReset,
        sendOtpViaTelegram,
        sendOtpViaEmail,
        verifyOtp,
        resetPassword,
        linkTelegramAccount,
        checkAndSyncTelegram,
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
