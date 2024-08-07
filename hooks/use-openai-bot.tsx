import { create } from "zustand";

type OpenAiBotStore = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useOpenAIBot = create<OpenAiBotStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
