import { create } from "zustand";

type StoreState = {
  isOpen: boolean;
  type?: string;
  hint?: string;
  data?: any;
  toggleModal: (type?: string, hint?: string, data?: any) => void;
};

const useModalStore = create<StoreState>((set) => ({
  isOpen: false,
  type: "",
  hint: "",
  data: null,
  toggleModal: (type, hint, data) =>
    set((state) => ({
      isOpen: !state.isOpen,
      type: type || state.type,
      hint: hint || state.hint,
      data: data || state.data,
    })),
}));

export default useModalStore;