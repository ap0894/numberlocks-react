import { Preferences } from '@capacitor/preferences';
import { PersistStorage, StorageValue } from 'zustand/middleware';

/**
 * Custom storage adapter for Zustand that uses Capacitor Preferences
 * instead of localStorage. This provides cross-platform storage
 * (web, iOS, Android) and meets iOS privacy requirements.
 */
export const capacitorStorage: PersistStorage<any> = {
  getItem: async (name: string): Promise<StorageValue<any> | null> => {
    try {
      const { value } = await Preferences.get({ key: name });
      return value ? JSON.parse(value) : null;
    } catch (error) {
      console.error(`[CapacitorStorage] Error getting item from Capacitor Preferences: ${name}`, error);
      return null;
    }
  },
  setItem: async (name: string, value: StorageValue<any>): Promise<void> => {
    try {
      await Preferences.set({ key: name, value: JSON.stringify(value) });
    } catch (error) {
      console.error(`[CapacitorStorage] Error setting item in Capacitor Preferences: ${name}`, error);
    }
  },
  removeItem: async (name: string): Promise<void> => {
    try {
      await Preferences.remove({ key: name });
    } catch (error) {
      console.error(`[CapacitorStorage] Error removing item from Capacitor Preferences: ${name}`, error);
    }
  }
};
