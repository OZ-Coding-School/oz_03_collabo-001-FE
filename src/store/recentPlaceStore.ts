/* eslint-disable no-unused-vars */
import { create } from 'zustand';
import { RegionListType } from '../components/BDPlace/Place';

interface RecentPlaceInfo {
  regionList: RegionListType[];
  location: string;
  name: string;
  rating: number;
  reviewCount: number;
}

interface RecentPlacesState {
  recentPlaces: Map<string, RecentPlaceInfo>;
  visiblePlaces: Map<string, RecentPlaceInfo>;
  showMore: boolean;
  addRecentPlace: (placeId: string, info: RecentPlaceInfo) => void;
  setRecentPlaces: (places: Map<string, RecentPlaceInfo>) => void;
  toggleShowMore: () => void;
}

const useRecentPlacesStore = create<RecentPlacesState>((set) => ({
  recentPlaces: new Map(),
  visiblePlaces: new Map(),
  showMore: false,
  addRecentPlace: (placeId, info) =>
    set((state) => {
      // Create a new Map with the new place added at the start
      const updatedPlaces = new Map([
        [placeId, info],
        ...state.recentPlaces.entries(),
      ]);

      // Update visiblePlaces based on the maximum number to show
      const maxVisibleSize = 6;
      const updatedVisiblePlaces = new Map(
        [...updatedPlaces.entries()].slice(0, maxVisibleSize)
      );

      return {
        recentPlaces: updatedPlaces,
        visiblePlaces: updatedVisiblePlaces,
      };
    }),
  setRecentPlaces: (places) =>
    set({
      recentPlaces: new Map(places),
      visiblePlaces: new Map([...places].slice(0, 6)),
    }),
  toggleShowMore: () =>
    set((state) => ({
      showMore: !state.showMore,
    })),
}));

export default useRecentPlacesStore;
