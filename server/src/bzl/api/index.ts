import { siteAPI } from './site';
import { authAPI } from './authentication';
import { autzAPI } from './autz';

export const registrarAPI = {
    auth: authAPI,
    autz: autzAPI,
    site: siteAPI
}