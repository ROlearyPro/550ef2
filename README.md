Setup:

In the project directory, run: npx create-react-app my-app in order to install react.
Run: npm install typescript --save-dev in order to install typescript.
Run: npm install cypress --save-dev in order to install cypress.
Run: npm install @jsonforms/core @jsonforms/react @jsonforms/material-renderers @mui/material to install JSONForms.
Run: npm install @emotion/react @emotion/styled @mui/icons-material @mui/x-date-pickers @mui/material dayjs to install MUI and Emotion packages.

### `npm start`

Runs the app in the development mode.\
You should open the challenge server first, and type y when asked to open on a different port.
Open [http://localhost:3001](http://localhost:3001) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npx cypress open`

Runs cypress, which will allow you to test based on the e2e specs included. You will need to have both the server and the application running when you run cypress.


## `Adding new data sources`

Simply put, to add new or more data sources, one can either change the data included in the challenge server this connects to, or change the fetch in App.tsx to take in other sources of data. This can be done dynamically, as seen with the APICalls.tsx and .env.development files I threw together as an example. In either case, one would likely have to alter the tests to account for the new information, if it replaces/alters existing data on the challenge server. 

### `Tests`

Currently, there are only a few tests, both due to the limited amount of time this challenge required and the fact that the current data the server gives us to render is pretty basic. If there were more dynamic components, more tests could be made, but as is, these cover the basics.

### `Video link`
[text](https://youtu.be/zlvyK62Gs6M)