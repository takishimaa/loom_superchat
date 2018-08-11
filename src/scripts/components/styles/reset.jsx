import { injectGlobal } from 'styled-components'

const resetStyle = injectGlobal`
@import url('https://fonts.googleapis.com/css?family=Lato:400,700');
* {
  margin: 0;
  padding: 0;
  &::selection {
    background-color: rgba(#193, 175, 255, .6);
  }
}
html {
  box-sizing: border-box;
  * {
    box-sizing: inherit;
    -webkit-tap-highlight-color: rgba(193, 175, 255, .6);
    &:before,
    &:after {
      box-sizing: border-box;
    }
  }
}
html,
body {
  -webkit-text-size-adjust: 100%;
  width: 100%;
  height: 100%;
  color: ${Colors.BLACK87};
  font-family: 'Lato', -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 62.5%;
  font-weight: 400;
  line-height:1;
  -webkit-font-smoothing: subpixel-antialiased;
  -moz-osx-font-smoothing: unset;
  @media only screen and(-webkit-min-device-pixel-ratio: 2),(min-resolution: 2dppx) {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
}
article,
aside,
figure,
footer,
header,
section {
  display: block;
}
h1,
h2,
h3,
h4,
h5,
h6 {
  font-size: 100%;
  font-weight: normal;
}
ul {
  list-style:none;
}
img {
  max-width: 100%;
  height: auto;
  vertical-align: top;
}
table {
  border-collapse:collapse;
  border-spacing:0;
}
th,
td {
  padding: 0;
  text-align: left;
}
a {
  color: inherit;
  text-decoration: none;
}
input, button, textarea, select {
  margin: 0;
  padding: 0;
  background: none;
  border: none;
  border-radius: 0;
  outline: none;
  -webkit-appearance: none;
  -moz-appearance: none;
}
iframe {
  border: none;
}
`

export default resetStyle