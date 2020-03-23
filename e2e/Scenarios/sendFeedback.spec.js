/* eslint no-undef: "warn" */
describe('The Feedback-Page is working as expected', () => {
  // it('shows the "Whats new"-page and navigates to the default-page', async () => {
  //   await element(by.text('OK')).tap();
  // });

  it('Navigates to the Feedback-Page', async () => {
    await element(by.id('ButtonSettings')).tap();
    await element(by.text('Feedback')).tap();
  });
  it('cannot post empty feedback', async () => {
    await element(by.id('InputFeedback')).typeText('     ');
    await element(by.text('Have some feedback?')).tap(); // Just to dismiss the keyboard...
    await element(by.text('Send')).tap();
    await waitFor(element(by.text('Thank you for the feedback!')))
      .toBeNotVisible()
      .withTimeout(1000);
  });

  it('Can write some feedback...', async () => {
    await element(by.id('InputFeedback')).typeText(
      '🤖Test: This is just an automated test. Have a nice day!'
    );
    await element(by.text('Have some feedback?')).tap(); // Just to dismiss the keyboard...
  });

  it('can post the feedback', async () => {
    await element(by.text('Send')).tap();
    await waitFor(element(by.text('Thank you for the feedback!')))
      .toBeVisible()
      .withTimeout(2000);
  });
});
