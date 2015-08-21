I cloned [react-mobservable-boilerplate](https://github.com/mweststrate/react-mobservable-boilerplate) and made some changes, including: 

(1) I substituted "extends React.Component" for "React.createClass".
(2) I left the React props object empty and defined "store" in the ToList constructor.
(3) I added some console.log output to log what was being rendered.
(4) I added an input box to get additional rendering feedback.

The console log shows that using Mobservable is sufficient to eliminate unnecessary rendering. Entering the same text again in the input box results in nothing being rendered. Editing, removing, checking check boxes, etc. all confirm that nothing would be gained by adding immutable.js and PureRenderMixin. Mobservable makes sure that only the components which have changed get re-rendered.
