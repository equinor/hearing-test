import Ajv from 'ajv';

export default new Ajv({ allErrors: true, jsonPointers: true });

export const matchError = (errors = [], path) =>
  errors && errors.length
    ? errors.reduce((acc, cur) => {
        if (cur.dataPath === path) {
          return [...acc, cur];
        }
        return acc;
      }, false)
    : false;
