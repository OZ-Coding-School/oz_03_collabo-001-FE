import { create } from 'zustand';

interface BookmarkState {
  bookmarks: number[];
  addBookmark: (id: number) => void;
  removeBookmark: (id: number) => void;
  isBookmarked: (id: number) => boolean;
}

export const useBookmarkStore = create<BookmarkState>((set, get) => ({
  bookmarks: [],
  addBookmark: (id) =>
    set((state) => ({ bookmarks: [...state.bookmarks, id] })),
  removeBookmark: (id) =>
    set((state) => ({
      bookmarks: state.bookmarks.filter((bookmarkId) => bookmarkId !== id),
    })),
  isBookmarked: (id) => get().bookmarks.includes(id),
}));
