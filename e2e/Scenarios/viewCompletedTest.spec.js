/* eslint no-undef: "warn" */
describe('View completed tests', () => {
  it('Can navigate into a previously taken test ( the one on top of the list )', async () => {
    await element(by.text('Fullførte tester')).tap();
    await element(by.id('test-0')).tap();
    await waitFor(element(by.text('OK'))).toBeVisible();
  });
});
