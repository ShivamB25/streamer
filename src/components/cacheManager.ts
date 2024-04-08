import NodeCache from 'node-cache';
import { fetchFilesAndFolders } from './indexer';
import fs from 'fs';

const cache = new NodeCache({ stdTTL: 86400, checkperiod: 10 });

// Function to initialize the cache manager
export const initializeCacheManager = () => {
  // Initial cache population
  fetchFilesAndFolders(cache, false, '').then(() => {
    console.log('Initial cache population completed.');
    updateLocalCacheFile();
  }).catch((error) => {
    console.error('Error during initial cache population:', error.message, error.stack);
  });

  // Schedule cache refresh every 24 hours
  setInterval(() => {
    console.log('Refreshing cache...');
    fetchFilesAndFolders(cache, false, '').then(() => {
      console.log('Cache refreshed successfully.');
      updateLocalCacheFile();
    }).catch((error) => {
      console.error('Error refreshing cache:', error.message, error.stack);
    });
  }, 86400000); // 24 hours in milliseconds

  // Check for new or deleted files every 10 seconds
  setInterval(() => {
    console.log('Checking for new or deleted files...');
    fetchFilesAndFolders(cache, true, '').then(() => { // The second argument indicates a quick check
      console.log('Check for new or deleted files completed.');
      updateLocalCacheFile();
    }).catch((error) => {
      console.error('Error checking for new or deleted files:', error.message, error.stack);
    });
  }, 10000); // 10 seconds in milliseconds
};

// Function to write the current state of the cache to a local file
const updateLocalCacheFile = () => {
  const cacheContent = cache.keys().reduce<Record<string, any>>((acc, key) => {
    const value = cache.get(key);
    if (value) {
      acc[key] = value;
    }
    return acc;
  }, {});

  fs.writeFile('./index.json', JSON.stringify(cacheContent, null, 2), (err) => {
    if (err) {
      console.error('Error writing cache to local file:', err.message, err.stack);
    } else {
      console.log('Local cache file updated successfully.');
    }
  });
};

// Expose the cache for other components to use
export const getCache = () => cache;
