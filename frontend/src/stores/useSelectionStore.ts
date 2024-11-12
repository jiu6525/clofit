// useSelectionStore.ts
import { create } from 'zustand';
import { shallow } from 'zustand/shallow';

interface SelectionState {
  selectedFullBodyImage: string | null;
  selectedTopImage: string | null;
  selectedBottomImage: string | null;
  setSelectedFullBodyImage: (url: string) => void;
  setSelectedTopImage: (url: string) => void;
  setSelectedBottomImage: (url: string) => void;
  resetSelections: () => void;
}

const useSelectionStore = create<SelectionState>((set) => ({
  selectedFullBodyImage: null,
  selectedTopImage: null,
  selectedBottomImage: null,
  setSelectedFullBodyImage: (url) => set({ selectedFullBodyImage: url }),
  setSelectedTopImage: (url) => set({ selectedTopImage: url }),
  setSelectedBottomImage: (url) => set({ selectedBottomImage: url }),
  resetSelections: () =>
    set({
      selectedFullBodyImage: null,
      selectedTopImage: null,
      selectedBottomImage: null,
    }),
}));

export default useSelectionStore;
