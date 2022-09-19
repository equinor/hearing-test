# Store

## File structure

Organize by domain/feature/entity. What to include in a directory:

* Actions
* Reducers
* Selectors
* Sagas
* Schemas
* Unit tests

Actions should be added to the export list in the ```store/index.js``` file.

## Config

The store configuration is setup in ```store/config/index.js```, alongside with the root reducer and saga.
