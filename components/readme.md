# Components

As a rule of thumb, a view component should be agnostic of the redux store and only relay on data through props. It should not contain logic besides presentation logic.

This is also known as a presentation component, dumb component etc.

Group components by feature and add them to a folder named after the feature in lower case and export by creating index.js file.
