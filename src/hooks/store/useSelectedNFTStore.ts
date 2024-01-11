import { create } from "zustand";

type SelectedNFTStore = {
  selectedNFT: Record<string, string>;
  setSelectedNFT: (id: string, value: string) => void;
};

const useSelectedNFTStore = create<SelectedNFTStore>((set) => ({
  selectedNFT: {},
  setSelectedNFT: (id, value) => {
    set((state) => ({
      ...state,
      selectedNFT: {
        ...state.selectedNFT,
        [id]: value,
      },
    }));
  },
}));

export default useSelectedNFTStore;
