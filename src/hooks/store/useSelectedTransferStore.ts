import { create } from "zustand";

type SelectedTransferStore = {
  selectedTransfer: Record<string, string>;
  setSelectedTransfer: (id: string, value: string) => void;
};

const useSelectedTransferStore = create<SelectedTransferStore>((set) => ({
  selectedTransfer: {},
  setSelectedTransfer: (id, value) => {
    set((state) => ({
      ...state,
      selectedTransfer: {
        ...state.selectedTransfer,
        [id]: value,
      },
    }));
  },
}));

export default useSelectedTransferStore;
