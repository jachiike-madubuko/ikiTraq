### uflo

## libraries used

React Navigation [https://reactnavigation.org/]

React Firebase [https://react-firebase-js.com/]

React Native UI Kitten [https://akveo.github.io/]


https://github.com/brentvatne/bottom-sheet-example/blob/master/App.tsx

https://github.com/jemise111/react-native-swipe-list-view

https://github.com/jmurzy/react-native-foldview

https://github.com/mfrachet/action-sheet-rn


Backend refactoring

All Collection Queries will be to collect ids
Using lazy loading view components (View Pager)
And using firestorter store, query the appropriate flo
This will prevent the bubbling up of UI state rerendering
Components will be seperated into proper container components
to distingish the number of files that use the Flo Doc and ones that just need the data
Steps
- seperation of functions for dummy components and container components
- proper usages of firestorter store and efficient use of collection queries for gathering IDs
- use isLoading and hasData on sub components rather than entire screens or components
- determine what data needs to be passed down to each component to properly function




