/* eslint-disable no-unused-vars */
import { create } from 'zustand';

interface BookmarkState {
  bookmarks: number[];

  setBookmarks: (ids: number[]) => void;
  addBookmark: (id: number) => void;
  removeBookmark: (id: number) => void;
  isBookmarked: (id: number) => boolean;
}

const useBookmarkStore = create<BookmarkState>((set, get) => ({
  bookmarks: JSON.parse(sessionStorage.getItem('bookmarks') || '[]'),

  setBookmarks: (ids: number[]) => {
    sessionStorage.setItem('bookmarks', JSON.stringify(ids));
    set({ bookmarks: ids });
  },
  addBookmark: (id) => {
    const updatedBookmarks = [...get().bookmarks, id];
    sessionStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks));
    set({ bookmarks: updatedBookmarks });
  },
  removeBookmark: (id) => {
    const updatedBookmarks = get().bookmarks.filter(
      (bookmarkId) => bookmarkId !== id
    );
    sessionStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks));
    set({ bookmarks: updatedBookmarks });
  },
  isBookmarked: (id) => get().bookmarks.includes(id),
}));

export default useBookmarkStore;
