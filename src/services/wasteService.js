import {
  authApi,
  wasteApi,
  collectionApi,
  marketplaceApi,
  passportApi,
  rewardsApi,
  impactApi,
  aiApi
} from '../api';

/**
 * Backward compatibility facade for legacy wasteService imports.
 * Routes directly through the clean API service layer.
 */
export const wasteService = {
  scanWasteImage: (img) => aiApi.analyzeWasteImage(img),
  getPassports: () => passportApi.getPassports(),
  getPassportById: (id) => passportApi.getPassportById(id),
  createPassport: (data) => passportApi.createPassport(data),
  getCollectionRequests: () => collectionApi.getCollections(),
  createCollectionRequest: (data) => collectionApi.createCollectionRequest(data),
  acceptCollectionRequest: (id) => collectionApi.acceptCollection(id),
  getMarketplaceItems: (filters) => marketplaceApi.getListings(filters),
  createMarketplaceItem: (data) => marketplaceApi.createListing(data),
  getLeaderboard: () => rewardsApi.getLeaderboard(),
  getImpactMetrics: () => impactApi.getImpactMetrics(),
  getChallenges: () => rewardsApi.getChallenges(),
  joinChallenge: (id) => rewardsApi.joinChallenge(id)
};

export default wasteService;
