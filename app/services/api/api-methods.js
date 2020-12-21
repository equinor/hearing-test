import { authenticateSilently } from '../adal';
import { getResource } from '../../settings';
import { NetworkException } from '../../utils/Exception';
import { name } from '../../../app.json';

const defaultResource = 'hearing';
const jsonHeaders = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

const createUrl = (resource, path) => `${getResource(resource).ApiBaseUrl}${path}`;

// Helper functions
const fetchData = (path, resource = defaultResource, parseJson = true) =>
  authenticateSilently(resource).then(r =>
    fetch(createUrl(resource, path), {
      method: 'GET',
      withCredentials: true,
      headers: {
        ...jsonHeaders,
        Authorization: `Bearer ${r.accessToken}`,
      },
    }).then(response => {
      if (response.ok) {
        if (parseJson) {
          return response.json();
        }
        return response.ok;
      }
      throw new NetworkException(response.statusText, response.status);
    })
  );

const postData = (path, data, method = 'POST', resource = defaultResource) =>
  authenticateSilently(resource).then(r =>
    fetch(createUrl(resource, path), {
      method,
      body: JSON.stringify(data),
      withCredentials: true,
      headers: {
        ...jsonHeaders,
        Authorization: `Bearer ${r.accessToken}`,
      },
    }).then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new NetworkException(response.statusText, response.status);
    })
  );

const fetchOpenData = (path, resource = defaultResource) =>
  fetch(createUrl(resource, path), {
    method: 'GET',
    ...jsonHeaders,
  }).then(response => {
    if (response.ok) {
      return response.json();
    }
    throw new NetworkException(response.statusText, response.status);
  });

export function getReleaseNote(version) {
  return fetchData(`/ReleaseNote/${name}/${version}`, 'common');
}

export const getServiceMessage = () => fetchOpenData(`/ServiceMessage/${name}`, 'common');

export const fetchTest = () =>
  postData(`/me/tests/takeTest`, {
    Hz500Db: 0,
    Hz1000Db: 0,
    Hz2000Db: 0,
    Hz3000Db: 0,
    Hz4000Db: 0,
    Hz6000Db: 0,
    Hz8000Db: 0,
  });

export const postTest = body => postData(`/me/tests`, body);

export const appInit = () => fetchData('/appStartup/init', defaultResource, false);

export const fetchTests = () => fetchData('/me/tests');
