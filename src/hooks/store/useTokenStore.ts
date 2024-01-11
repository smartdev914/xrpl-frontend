import { create } from "zustand";

type TokenStore = {
  tokenIds: string[];
  loading: Record<string, boolean>; // Maps addresses to loading states
  addTokenId: (id: string) => void;
  setLoading: (address: string, loading: boolean) => void; // New action to set loading state
  removeAll: () => void;
};

const useTokenStore = create<TokenStore>((set) => ({
  tokenIds: [],
  loading: {},
  addTokenId: (id) => {
    set((state) => {
      if (state.tokenIds.includes(id)) {
        return state;
      }
      return {
        ...state,
        tokenIds: [...state.tokenIds, id],
      };
    });
  },
  setLoading: (address, loading) => {
    set((state) => ({
      ...state,
      loading: {
        ...state.loading,
        [address]: loading,
      },
    }));
  },
  removeAll: () => set((state) => ({ ...state, loading: {}, tokenIds: [] })),
}));

export default useTokenStore;
