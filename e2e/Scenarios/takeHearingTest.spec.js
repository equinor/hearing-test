/* eslint no-undef: "warn" */
describe('Example', () => {
  // https://github.com/wix/Detox/blob/master/docs/Introduction.WritingFirstTest.md#step-2-decide-how-to-reset-your-app-for-the-beginning-of-the-scenario
  // beforeEach(async () => {
  //   await device.reloadReactNative();
  // });

  it('shows the "Whats new"-page and navigates to the default-page', async () => {
    await element(by.text('OK')).tap();
  });

  it('cannot take the test if sick', async () => {
    await element(by.text('Ta hørselstesten')).tap();
    await element(by.text('Start')).tap();
    await element(by.text('Jeg er forkjølet')).tap();
    await element(by.text('Tilbake til menyen')).tap();
  });

  it('navigates through the pre-test page', async () => {
    await element(by.text('Ta hørselstesten')).tap();

    await element(by.text('Start')).tap();
    await element(by.text('Jeg er klar for testen')).tap();
    await element(by.text('Se hvordan testen fungerer')).tap();
    await element(by.text('Start hørselstest')).tap();
  });

  it('SoundCheck page', async () => {
    await element(by.text('Spill av test-lyd')).tap();

    await element(by.text('Nei')).tap();
    await element(by.text('OK')).tap();

    await element(by.text('Ja')).tap();
  });

  it('Starts the test and can stop the test', async () => {
    await element(by.text('Start testen')).tap();

    await element(by.id('BigRoundButton')).tap();
    await element(by.id('BigRoundButton')).tap();
    await element(by.id('BigRoundButton')).tap();
    await element(by.id('BigRoundButton')).tap();
    // await element(by.text('Jeg hører en lyd nå')).tap();

    await element(by.text('Jeg har behov for å stoppe testen')).tap();
    await element(by.text('Stopp testen')).tap();
  });
});
