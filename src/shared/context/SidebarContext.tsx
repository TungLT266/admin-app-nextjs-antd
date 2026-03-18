"use client";
import React, { createContext, useContext, useState } from "react";

interface SidebarContextType {
  collapsed: boolean;
  toggleCollapsed: () => void;
  sidebarWidth: number;
}

const SidebarContext = createContext<SidebarContextType>({
  collapsed: false,
  toggleCollapsed: () => {},
  sidebarWidth: 250,
});

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const toggleCollapsed = () => setCollapsed((prev) => !prev);
  const sidebarWidth = collapsed ? 80 : 250;

  return (
    <SidebarContext.Provider value={{ collapsed, toggleCollapsed, sidebarWidth }}>
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  return useContext(SidebarContext);
}
