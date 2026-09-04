/**
 * Unified WasteChain API Service Layer
 * Decouples all frontend components from backend transport implementation.
 */

export { default as apiClient, API_BASE_URL, USE_MOCK_API } from './apiClient';
export { default as authApi } from './authApi';
export { default as wasteApi } from './wasteApi';
export { default as collectionApi } from './collectionApi';
export { default as marketplaceApi } from './marketplaceApi';
export { default as collectorApi } from './collectorApi';
export { default as passportApi } from './passportApi';
export { default as rewardsApi } from './rewardsApi';
export { default as impactApi } from './impactApi';
export { default as aiApi } from './aiApi';
export { default as hotspotApi } from './hotspotApi';
export { default as paymentApi } from './paymentApi';
