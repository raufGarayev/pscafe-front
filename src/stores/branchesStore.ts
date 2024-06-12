import {create} from 'zustand';
import { Branch } from '../types/branches';
import { getBranches } from '../services/branches';

type StoreState = {
  branches: Branch[];
  selectedBranch: Branch | null;
  setBranches: (branches: Branch[]) => void;
  setSelectedBranch: (selectedBranch: Branch | null) => void;
  getBranchesToStore: () => void
};

const useBranchStore = create<StoreState>(set => ({
  branches: [],
  selectedBranch: null,
  setBranches: branches => set({branches}),
  setSelectedBranch: selectedBranch => set({selectedBranch}),
  getBranchesToStore: () => {
    getBranches().then((res) => {
        set({branches: res.data})
    })
  }
}));

export default useBranchStore;