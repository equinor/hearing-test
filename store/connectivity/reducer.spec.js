import reducer from './reducer';

it('should set the correct state', () => {
  const action = {
    type: 'Connectivity/SET',
    payload: true,
  };
  let state = {};

  state = reducer(state, action);
  expect(state).toEqual({
    connected: true,
  });

  action.payload = false;
  state = reducer(state, action);
  expect(state).toEqual({
    connected: false,
  });
});
