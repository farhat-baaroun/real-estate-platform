import supertokens from 'supertokens-node';
import EmailPassword from 'supertokens-node/recipe/emailpassword';
import Session from 'supertokens-node/recipe/session';

let initialized = false;

function isLocalDomain(value: string): boolean {
  return value.includes('localhost') || value.includes('127.0.0.1');
}

export function initSuperTokens(): void {
  if (initialized) {
    return;
  }

  const connectionURI = process.env.SUPERTOKENS_CONNECTION_URI;
  const apiKey = process.env.SUPERTOKENS_API_KEY;
  const apiDomain = process.env.API_DOMAIN;
  const websiteDomain = process.env.WEBSITE_DOMAIN;
  const isStrictMode =
    process.env.NODE_ENV === 'production' ||
    (apiDomain !== undefined && !isLocalDomain(apiDomain)) ||
    (websiteDomain !== undefined && !isLocalDomain(websiteDomain));

  if (isStrictMode) {
    const requiredVars: Array<[string, string | undefined]> = [
      ['SUPERTOKENS_CONNECTION_URI', connectionURI],
      ['SUPERTOKENS_API_KEY', apiKey],
      ['API_DOMAIN', apiDomain],
      ['WEBSITE_DOMAIN', websiteDomain],
    ];
    const missing = requiredVars.filter(([, value]) => !value).map(([name]) => name);
    if (missing.length > 0) {
      throw new Error(`Missing required auth configuration: ${missing.join(', ')}`);
    }
  }

  supertokens.init({
    supertokens: {
      connectionURI: connectionURI ?? 'https://try.supertokens.com',
      apiKey,
    },
    appInfo: {
      appName: 'real-estate-platform',
      apiDomain: apiDomain ?? 'http://localhost:3001',
      websiteDomain: websiteDomain ?? 'http://localhost:8080',
      apiBasePath: '/auth',
      websiteBasePath: '/auth',
    },
    recipeList: [
      EmailPassword.init({
        override: {
          apis: (originalImplementation) => ({
            ...originalImplementation,
            signUpPOST: undefined,
            signInPOST: undefined,
          }),
        },
      }),
      Session.init({
        getTokenTransferMethod: () => 'cookie',
        override: {
          apis: (originalImplementation) => ({
            ...originalImplementation,
            signOutPOST: undefined,
          }),
        },
      }),
    ],
  });

  initialized = true;
}
