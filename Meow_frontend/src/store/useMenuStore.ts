import { CurrentPageStage, MenuItem } from '@/shared/model/menu.model';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface MenuStore {
  current: CurrentPageStage | null;
  menuItems: MenuItem[];
  setMenuItems: (items: MenuItem[]) => void;
  setCurrent: (item: CurrentPageStage) => void;
}

const useMenuStore = create<MenuStore>()(
  devtools(set => ({
    current: null,
    menuItems: [],
    setMenuItems: items => set({ menuItems: items }),
    setCurrent: item => set({ current: item }),
  })),
);

export default useMenuStore;
