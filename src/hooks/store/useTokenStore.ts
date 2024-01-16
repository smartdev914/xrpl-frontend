import { create } from "zustand";

export type TokenStore = {
  tokenIds: string[];
  loading: Record<string, boolean>;
  addTokenId: (id: string) => void;
  setLoading: (address: string, loading: boolean) => void;
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
