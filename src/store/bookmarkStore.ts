import { create } from 'zustand';

interface BookmarkState {
  bookmarks: number[];
  addBookmark: (id: number) => void;
  removeBookmark: (id: number) => void;
  isBookmarked: (id: number) => boolean;
}

export const useBookmarkStore = create<BookmarkState>((set, get) => ({
  bookmarks: JSON.parse(localStorage.getItem('bookmarks') || '[]'),
  addBookmark: (id) => {
    const updatedBookmarks = [...get().bookmarks, id];
    localStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks));
    set({ bookmarks: updatedBookmarks });
  },
  removeBookmark: (id) => {
    const updatedBookmarks = get().bookmarks.filter(
      (bookmarkId) => bookmarkId !== id
    );
    localStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks));
    set({ bookmarks: updatedBookmarks });
  },
  isBookmarked: (id) => get().bookmarks.includes(id),
}));
