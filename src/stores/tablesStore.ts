import { create } from 'zustand';
import { RunningTable, Table } from '../types/tables';
import { getRunningTables, getTables } from '../services/tables';
import { toZonedTime } from 'date-fns-tz';

type StoreState = {
  tables: Table[];
  selectedTable: Table | null;
  startTimer: (tableId: number, elapsedTime: any) => void;
  selectTable: (tableId: Table | null) => void;
  runningTables: RunningTable[];
  getTablesToStore: () => void;
  getRunningTablesToStore: () => void;
};

const useTablesStore = create<StoreState>((set) => ({
  tables: [],
  runningTables: [],
  selectedTable: null,
  startTimer: (tableId, elapsedTime) =>
    set((state) => {
      const startTime = Date.now() - elapsedTime; // Calculate start time based on elapsed time
      const utcStartTime = toZonedTime(startTime, 'Asia/Bakue')
      const updatedTables = state.tables.map((table) =>
        table.id === tableId
          ? { ...table, startTime: utcStartTime.getTime(), elapsedTime: 0, intervalId: null }
          : table
      );
      return { tables: updatedTables };
    }),  
  selectTable: (table) => set({ selectedTable: table }),
  getTablesToStore: () => {
    getTables().then((tables) => {
      set({ tables });
    });
  },
  getRunningTablesToStore: () => {
    getRunningTables().then((runningTables) => {
      set({ runningTables });
    });
  },
}));

export default useTablesStore;
