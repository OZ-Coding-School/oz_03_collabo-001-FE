/* eslint-disable no-unused-vars */
import { create } from 'zustand';
// import axios from 'axios';

interface PlaceInfo {
  placeId: string;
  location: string;
  name: string;
  rating: number;
  reviewCount: number;
}

interface BookmarkState {
  bookmarks: Record<string, boolean>;
  placesInfo: Record<string, PlaceInfo>;
  isLoading: boolean;
  error: string | null;
  toggleBookmark: (placeInfo: PlaceInfo) => void;
  loadBookmarks: () => void;
  loadBookmarkedPlaces: () => Promise<void>;
  addPlaceInfo: (placeInfo: PlaceInfo) => void;
  setError: (error: string | null) => void;
}

const useBookmarkStore = create<BookmarkState>((set) => ({
  bookmarks: {},
  placesInfo: {},
  isLoading: false,
  error: null,

  toggleBookmark: (placeInfo) =>
    set((state) => {
      const currentBookmark = state.bookmarks[placeInfo.placeId];
      const updatedBookmarks = { ...state.bookmarks };

      if (currentBookmark) {
        // 이미 북마크된 장소라면 제거
        delete updatedBookmarks[placeInfo.placeId];
      } else {
        // 새로운 북마크 추가
        updatedBookmarks[placeInfo.placeId] = true; // 추가된 부분
      }

      return { bookmarks: updatedBookmarks };
    }),

  loadBookmarks: async () => {
    set({ isLoading: true, error: null });
    // 서버 연동 시 사용할 코드
    // try {
    //   const response = await axios.get('/api/bookmarks');
    //   set({ bookmarks: response.data, isLoading: false });
    // } catch (error) {
    //   set({ error: 'Failed to load bookmarks', isLoading: false });
    // }
  },

  loadBookmarkedPlaces: async () => {
    set({ isLoading: true, error: null });
    // 서버 연동 시 사용할 코드
    // try {
    //   const response = await axios.get('/api/bookmarked-places');
    //   set({
    //     bookmarks: response.data.reduce((acc, place) => ({ ...acc, [place.placeId]: true }), {}),
    //     placesInfo: response.data.reduce((acc, place) => ({ ...acc, [place.placeId]: place }), {}),
    //     isLoading: false
    //   });
    // } catch (error) {
    //   set({ error: 'Failed to load bookmarked places', isLoading: false });
    // }
  },

  addPlaceInfo: (placeInfo) =>
    set((state) => {
      // placeId가 이미 존재하는지 확인
      if (!state.placesInfo[placeInfo.placeId]) {
        return {
          placesInfo: { ...state.placesInfo, [placeInfo.placeId]: placeInfo },
        };
      }
      return state;
    }),

  setError: (error) => set({ error }),
}));

export default useBookmarkStore;
