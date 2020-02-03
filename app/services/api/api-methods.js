import { authenticateSilently } from '../adal';
import { getResource } from '../../settings';
import { NetworkException } from '../../utils/Exception';
import { name } from '../../../app.json';

const defaultResource = 'mad';
const jsonHeaders = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

const createUrl = (resource, path) => `${getResource(resource).ApiBaseUrl}${path}`;

// Helper functions
const fetchData = (path, resource = defaultResource) =>
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
        return response.json();
      }
      throw new NetworkException(response.statusText, response.status);
    })
  );

// eslint-disable-next-line no-unused-vars
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
