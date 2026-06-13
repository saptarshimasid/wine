import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Drink {
  id: string;
  name: string;
  category: string;
  description: string;
  abv: string;
  origin: string;
  rating: number;
  price: string;
  image: string;
  notes: string[];
  glass: string;
}

interface AIProfilerState {
  mood: string;
  notes: string[];
  occasion: string;
  loading: boolean;
  result: string | null;
  error: string | null;
}

interface DrinksState {
  favorites: string[];
  compareList: Drink[];
  filters: {
    category: string;
    searchQuery: string;
    sortBy: 'name' | 'rating' | 'abv';
  };
  aiProfiler: AIProfilerState;
}

const initialState: DrinksState = {
  favorites: [],
  compareList: [],
  filters: {
    category: 'All',
    searchQuery: '',
    sortBy: 'rating',
  },
  aiProfiler: {
    mood: '',
    notes: [],
    occasion: '',
    loading: false,
    result: null,
    error: null,
  },
};

const drinksSlice = createSlice({
  name: 'drinks',
  initialState,
  reducers: {
    toggleFavorite(state, action: PayloadAction<string>) {
      const id = action.payload;
      if (state.favorites.includes(id)) {
        state.favorites = state.favorites.filter((favId) => favId !== id);
      } else {
        state.favorites.push(id);
      }
    },
    addToCompare(state, action: PayloadAction<Drink>) {
      const drink = action.payload;
      if (state.compareList.some((d) => d.id === drink.id)) return;
      if (state.compareList.length >= 3) {
        state.compareList.shift(); // Remove first to keep max 3
      }
      state.compareList.push(drink);
    },
    removeFromCompare(state, action: PayloadAction<string>) {
      state.compareList = state.compareList.filter((d) => d.id !== action.payload);
    },
    clearCompare(state) {
      state.compareList = [];
    },
    setCategory(state, action: PayloadAction<string>) {
      state.filters.category = action.payload;
    },
    setSearchQuery(state, action: PayloadAction<string>) {
      state.filters.searchQuery = action.payload;
    },
    setSortBy(state, action: PayloadAction<'name' | 'rating' | 'abv'>) {
      state.filters.sortBy = action.payload;
    },
    startAIProfiling(state) {
      state.aiProfiler.loading = true;
      state.aiProfiler.error = null;
      state.aiProfiler.result = null;
    },
    setAIProfileInputs(state, action: PayloadAction<{ mood: string; occasion: string; notes: string[] }>) {
      state.aiProfiler.mood = action.payload.mood;
      state.aiProfiler.occasion = action.payload.occasion;
      state.aiProfiler.notes = action.payload.notes;
    },
    aiProfilingSuccess(state, action: PayloadAction<string>) {
      state.aiProfiler.loading = false;
      state.aiProfiler.result = action.payload;
    },
    aiProfilingFailure(state, action: PayloadAction<string>) {
      state.aiProfiler.loading = false;
      state.aiProfiler.error = action.payload;
    },
    resetAIProfiler(state) {
      state.aiProfiler = {
        mood: '',
        notes: [],
        occasion: '',
        loading: false,
        result: null,
        error: null,
      };
    },
  },
});

export const {
  toggleFavorite,
  addToCompare,
  removeFromCompare,
  clearCompare,
  setCategory,
  setSearchQuery,
  setSortBy,
  startAIProfiling,
  setAIProfileInputs,
  aiProfilingSuccess,
  aiProfilingFailure,
  resetAIProfiler,
} = drinksSlice.actions;

export default drinksSlice.reducer;
