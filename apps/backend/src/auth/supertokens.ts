import supertokens from 'supertokens-node';
import EmailPassword from 'supertokens-node/recipe/emailpassword';
import Session from 'supertokens-node/recipe/session';

let initialized = false;

export function initSuperTokens(): void {
  if (initialized) {
    return;
  }

  supertokens.init({
    supertokens: {
      connectionURI: process.env.SUPERTOKENS_CONNECTION_URI ?? 'https://try.supertokens.com',
      apiKey: process.env.SUPERTOKENS_API_KEY,
    },
    appInfo: {
      appName: 'real-estate-platform',
      apiDomain: process.env.API_DOMAIN ?? 'http://localhost:3001',
      websiteDomain: process.env.WEBSITE_DOMAIN ?? 'http://localhost:8080',
      apiBasePath: '/auth',
      websiteBasePath: '/auth',
    },
    recipeList: [EmailPassword.init(), Session.init()],
  });

  initialized = true;
}
