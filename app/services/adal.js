import AuthenticationContext from 'react-native-ms-adal/msadal/AuthenticationContext';
import CookieManager from 'react-native-cookies';
import find from 'lodash/find';
import filter from 'lodash/filter';
import { AzureADAuthority, AzureADClientId, AzureADRedirectUrl, getResource } from '../settings';

const getAuthenticationContext = () => {
  const authContext = new AuthenticationContext(AzureADAuthority, true);
  return new Promise((resolve, reject) =>
    authContext.tokenCache.readItems().then(items => {
      if (items.length > 0) {
        resolve(new AuthenticationContext(items[0].authority));
      } else {
        resolve(authContext);
      }
    }, reject)
  );
};

const contextPromise = getAuthenticationContext();

const clearCookieStore = () => CookieManager.clearAll();

function clearAllTokens() {
  return contextPromise.then(async context => {
    const items = await context.tokenCache.readItems();
    const aItems = filter(items, item => item.clientId === AzureADClientId);
    return Promise.all(aItems.map(item => context.tokenCache.deleteItem(item)));
  });
}

export function getRefreshToken() {
  return new Promise((resolve, reject) =>
    contextPromise
      .then(context => context.tokenCache.readItems())
      .then(cachedItems => {
        const token = find(
          filter(cachedItems, {
            authority: AzureADAuthority,
            clientId: AzureADClientId,
            isMultipleResourceRefreshToken: true,
          }),
          item => !!item.userInfo
        );
        if (!token) {
          reject();
        } else {
          resolve(token);
        }
      })
  );
}

export function AdalError(code, message, domain) {
  this.code = Number(code);
  this.message = message;
  this.domain = domain;
}

export function authenticate(resources) {
  const allResources = Array.isArray(resources) ? resources : [resources];
  return contextPromise
    .then(context =>
      allResources.reduce(
        (promise, resource) =>
          promise.then(
            () =>
              new Promise((resolve, reject) => {
                context
                  .acquireTokenAsync(
                    getResource(resource).AzureADResourceId,
                    AzureADClientId,
                    AzureADRedirectUrl
                  )
                  .then(resolve, reject);
              })
          ),
        Promise.resolve()
      )
    )
    .catch(err => {
      switch (err.domain) {
        case 'ADAuthenticationErrorDomain':
        case 'ADBrokerResponseErrorDomain':
          throw new AdalError(err.code, err.message, err.domain);
        default:
          throw err;
      }
    });
}

export function authenticateSilently(resources) {
  const allResources = Array.isArray(resources) ? resources : [resources];
  return contextPromise
    .then(context =>
      allResources.reduce(
        (promise, resource) =>
          promise.then(
            () =>
              new Promise((resolve, reject) => {
                context
                  .acquireTokenSilentAsync(getResource(resource).AzureADResourceId, AzureADClientId)
                  .then(resolve, reject);
              })
          ),
        Promise.resolve()
      )
    )
    .catch(err => {
      switch (err.domain) {
        case 'ADAuthenticationErrorDomain':
        case 'ADBrokerResponseErrorDomain':
          throw new AdalError(err.code, err.message, err.domain);
        default:
          throw err;
      }
    });
}

export function logout() {
  return clearAllTokens()
    .then(() =>
      fetch(
        `https://login.windows.net/common/oauth2/logout?post_logout_redirect_uri=${AzureADRedirectUrl}`
      )
    )
    .then(clearCookieStore)
    .catch(Promise.resolve);
}
