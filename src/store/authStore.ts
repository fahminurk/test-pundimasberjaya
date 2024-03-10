import { StateCreator } from "zustand";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type User = {
  id: number;
  name: string;
  email: string;
};

export type AuthSlice = {
  user: User | null;
  onAuthSuccess: ({ user }: { user: User }) => void;
  onLogout: () => void;
};

export const createAuthSlice: StateCreator<AuthSlice, [], [], AuthSlice> = (
  set
) => ({
  user: null,
  onAuthSuccess: (payload) => {
    set(() => ({ ...payload }));
  },
  onLogout: () => {
    set(() => ({
      user: null,
    }));
  },
});

export type IGlobalStore = AuthSlice;

export const STORAGE_KEY = "foothub_storage";

export const useAuthStore = create<
  IGlobalStore,
  [["zustand/persist", Pick<IGlobalStore, "user">]]
>(
  persist(
    (...a) => ({
      ...createAuthSlice(...a),
    }),
    {
      name: STORAGE_KEY,
      partialize: (state) => ({
        user: state.user,
      }),
    }
  )
);
