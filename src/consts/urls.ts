// https://api-style-counsel-mcq.azurewebsites.net/swagger-ui/index.html

const URLS = {
  base: import.meta.env.VITE_APP_API_BASE_URL + import.meta.env.VITE_APP_API_VERSION,
  portfolios: 'portfolios/user/101/summary',
  portfolioDraft: 'portfolios',
  portfolioById: (portfolioId: string) => `portfolios/${portfolioId}/details`,
  settingsByUser: 'user-reference-data/101',
  defaultSettings: 'static-reference-data/fetch-all',
};

export default URLS;
