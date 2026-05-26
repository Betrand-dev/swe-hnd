import {
  createContext,
  type PropsWithChildren,
  useContext,
  useMemo,
  useState,
} from "react";

type AppDrawerContextValue = {
  isOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  toggleDrawer: () => void;
};

const AppDrawerContext = createContext<AppDrawerContextValue | null>(null);

export function AppDrawerProvider({ children }: PropsWithChildren) {
  const [isOpen, setIsOpen] = useState(false);

  const value = useMemo(
    () => ({
      isOpen,
      openDrawer: () => setIsOpen(true),
      closeDrawer: () => setIsOpen(false),
      toggleDrawer: () => setIsOpen((current) => !current),
    }),
    [isOpen],
  );

  return (
    <AppDrawerContext.Provider value={value}>{children}</AppDrawerContext.Provider>
  );
}

export function useAppDrawer() {
  const context = useContext(AppDrawerContext);

  if (!context) {
    throw new Error("useAppDrawer must be used within an AppDrawerProvider.");
  }

  return context;
}
