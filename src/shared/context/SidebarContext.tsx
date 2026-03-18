"use client";
import React, { createContext, useContext, useState } from "react";

interface SidebarContextType {
  collapsed: boolean;
  toggleCollapsed: () => void;
  sidebarWidth: number;
  mobileOpen: boolean;
  openMobile: () => void;
  closeMobile: () => void;
}

const SidebarContext = createContext<SidebarContextType>({
  collapsed: false,
  toggleCollapsed: () => {},
  sidebarWidth: 250,
  mobileOpen: false,
  openMobile: () => {},
  closeMobile: () => {},
});

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleCollapsed = () => setCollapsed((prev) => !prev);
  const sidebarWidth = collapsed ? 80 : 250;
  const openMobile = () => setMobileOpen(true);
  const closeMobile = () => setMobileOpen(false);

  return (
    <SidebarContext.Provider
      value={{ collapsed, toggleCollapsed, sidebarWidth, mobileOpen, openMobile, closeMobile }}
    >
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  return useContext(SidebarContext);
}
