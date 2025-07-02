import { create } from 'zustand';

const useWebsiteStore = create((set) => ({
  websites: [],
  currentWebsite: null,
  
  addWebsite: (website) => set((state) => {
    const newWebsites = [...state.websites, { ...website, id: Date.now().toString() }];
    localStorage.setItem('websites', JSON.stringify(newWebsites));
    return { websites: newWebsites };
  }),
  
  updateWebsite: (updatedWebsite) => set((state) => {
    const newWebsites = state.websites.map(w => 
      w.id === updatedWebsite.id ? updatedWebsite : w
    );
    localStorage.setItem('websites', JSON.stringify(newWebsites));
    return { websites: newWebsites };
  }),
  
  setCurrentWebsite: (website) => set({ currentWebsite: website }),
  
  // Initialize from localStorage
  init: () => {
    const savedWebsites = localStorage.getItem('websites');
    if (savedWebsites) {
      set({ websites: JSON.parse(savedWebsites) });
    }
  }
}));

export default useWebsiteStore;