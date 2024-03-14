"use client";
import { queryClient } from "@/lib/react-query";
import { QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider as ColorProvider } from "next-themes";
import type { ThemeProviderProps } from "next-themes/dist/types";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  return <SessionProvider>{children}</SessionProvider>;
};

const DataProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

const ThemeProvider = ({ children, ...props }: ThemeProviderProps) => {
  return <ColorProvider {...props}>{children}</ColorProvider>;
};

export { AuthProvider, DataProvider, ThemeProvider };
