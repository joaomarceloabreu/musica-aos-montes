"use client";

import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";
import ContentDialog from "./ContentDialog";
import Gallery from "./Gallery";
import Press from "./Press";
import type { DialogId } from "../lib/nav-links";

interface DialogContextValue {
  openDialog: (id: DialogId) => void;
  closeDialog: () => void;
}

const DialogContext = createContext<DialogContextValue | null>(null);

export function useDialog() {
  const ctx = useContext(DialogContext);
  if (!ctx) {
    throw new Error("useDialog must be used within DialogProvider");
  }
  return ctx;
}

export default function DialogProvider({ children }: { children: ReactNode }) {
  const [activeDialog, setActiveDialog] = useState<DialogId | null>(null);

  const openDialog = useCallback((id: DialogId) => {
    setActiveDialog(id);
  }, []);

  const closeDialog = useCallback(() => {
    setActiveDialog(null);
  }, []);

  return (
    <DialogContext.Provider value={{ openDialog, closeDialog }}>
      {children}

      <ContentDialog
        open={activeDialog === "galeria"}
        onClose={closeDialog}
        title="Galeria — Momentos"
        variant="light"
      >
        <Gallery />
      </ContentDialog>

      <ContentDialog
        open={activeDialog === "na-midia"}
        onClose={closeDialog}
        title="Na mídia"
        variant="dark"
      >
        <Press />
      </ContentDialog>
    </DialogContext.Provider>
  );
}
