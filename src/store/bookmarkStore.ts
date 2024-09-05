/* eslint-disable no-unused-vars */
import { create } from 'zustand';

interface BookmarkState {
  bookmarks: number[];
  setBookmarks: (ids: number[]) => void;
  addBookmark: (id: number) => void;
  removeBookmark: (id: number) => void;
  isBookmarked: (id: number) => boolean;
}

export const useBookmarkStore = create<BookmarkState>((set, get) => ({
  bookmarks: [],
  setBookmarks: (ids: number[]) => {
    set({ bookmarks: ids });
  },
  addBookmark: (id) => {
    const updatedBookmarks = [...get().bookmarks, id];
    set({ bookmarks: updatedBookmarks });
  },
  removeBookmark: (id) => {
    const updatedBookmarks = get().bookmarks.filter(
      (bookmarkId) => bookmarkId !== id
    );
    set({ bookmarks: updatedBookmarks });
  },
  isBookmarked: (id) => get().bookmarks.includes(id),
}));
