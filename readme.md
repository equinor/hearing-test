Hørselstest
--------------------

This app allows users to perform self-administered hearing checks.
Tests are administered with the iOS device and specific headphone equipment.  
The results of tests can be viewed by the user.  
Future versions are expected to improve the tests and to also allow the sharing of test results with health professionals by user request.

Tldr: An app to simplify the process of monitoring your hearing over time.

# Taking a test

The API provides a test-tree in a json format for the app to traverse.

A test consist of multiple subtests.
Every subtest is a binary tree consisting of test-nodes.

```json5
{
  // Some metadata about the whole test.
  "id": "b792197a-6d6b-4594-9555-5be7d51bc55b",
  "userId": "",
  "name": "Short test",
  "dateTaken": null,
  "subTests": [
    {
      data: {
        // DATA - Contains data for running one audio sample.
        "index": 1,
        "sound": {
          // The audio file we play. The app only cares about the url.
          "name": "3kHz_Dobbelpip.wav",
          "hz": 3000.0,
          "url": "https://heardevhfjmkdbuaotts.blob.core.windows.net/sounds/3kHz_Dobbelpip.wav"
        },
        "preDelayMs": 2000, // ms before playing the audio.
        "postDelayMs": 1500, // ms after playing the audio.
        "panning": -1.0, // What ear you want the audio in. -1 for left 1.
        "stimulusDb": -60.0, // We don't use this in the test, but nice to have to verify the stimulusMultiplicative.
        "headsetProfileDb": 0.0, // headsetProfileDb - Also, Metadata. We don't use it in the test, but we store it here for future ref.
        // This is calculated from the stimulusDb and is used by the app to Set the output volume. A decimal number between 0 and 1.
        "stimulusMultiplicative": 0.001,
        // The results of the test gets stored in the userResponse. Controlled by the client.
        "userResponse": {
          "success": null, // Boolean true or false. We set it to true if the user presses the button during the postDelay.
          "reactionTimeMs": null, // time in ms before the button was last pressed.
          "numberOfClicks": null, // The number of clicks that was.
          "systemVolume": null // Logging what the system volume was when playing the audio.
        },
        // If user succeeds, we move along this branch.
        success: {
          // Success leads to the next test-node. With the same structure as the parent.
          data: {},
          success: {},
          failure: {}
        },
        // If user fails, we move along this branch.
        failure: {
          // Failure leads to the next test-node. With the same structure as the parent.
          data: {},
          success: {},
          failure: {}
        },
        //Note that each test-node have the same structure.
      },
    },
  ]
}
```
