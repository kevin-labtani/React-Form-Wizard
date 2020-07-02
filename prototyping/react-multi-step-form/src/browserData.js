/* eslint-disable no-undef */
import {
  isMobile,
  isMobileOnly,
  isTablet,
  isAndroid,
  isIOS,
  isWinPhone,
} from "react-device-detect";

// https://stackoverflow.com/questions/9847580/how-to-detect-safari-chrome-ie-firefox-and-opera-browser
// Opera 8.0+
const isOpera =
  (!!window.opr && !!opr.addons) ||
  !!window.opera ||
  navigator.userAgent.indexOf(" OPR/") >= 0;

// Firefox 1.0+
const isFirefox = typeof InstallTrigger !== "undefined";

// Safari 3.0+ "[object HTMLElementConstructor]"
const isSafari =
  /constructor/i.test(window.HTMLElement) ||
  (function (p) {
    return p.toString() === "[object SafariRemoteNotification]";
  })(
    !window["safari"] ||
      (typeof safari !== "undefined" && safari.pushNotification)
  );

// Internet Explorer 6-11
const isIE = /*@cc_on!@*/ false || !!document.documentMode;

// Edge 20+
const isEdge = !isIE && !!window.StyleMedia;

// Chrome 1 - 79
const isChrome =
  !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime);

// Edge (based on chromium) detection
// eslint-disable-next-line eqeqeq
const isEdgeChromium = isChrome && navigator.userAgent.indexOf("Edg") != -1;

let browserName = "";
browserName += isFirefox ? "Firefox" : "";
browserName += isChrome ? "Chrome" : "";
browserName += isSafari ? "Safari" : "";
browserName += isOpera ? "Opera" : "";
browserName += isIE ? "IE" : "";
browserName += isEdge ? "Legacy Edge" : "";
browserName += isEdgeChromium ? "Edge Chromium" : "";

let mobile = "";
if (isMobile) {
  if (isAndroid) {
    mobile += "Android";
  }
  if (isWinPhone) {
    mobile += "Windows Phone";
  }
  if (isIOS) {
    mobile += "IOS";
  }
  if (isMobileOnly) {
    mobile += " Phone";
  }
  if (isTablet) {
    mobile += " Tablet";
  }
}

const userAgent = window.navigator.userAgent;
const browserPreferredLanguage = window.navigator.language;
const browserLanguages = window.navigator.languages;
const userPlatform = window.navigator.platform;
const browserOnline = window.navigator.onLine;
const referrer = document.referrer;

export {
  browserName,
  userAgent,
  browserPreferredLanguage,
  browserLanguages,
  userPlatform,
  browserOnline,
  referrer,
  mobile,
};

  
  // import {
  //   browserName,
  //   userAgent,
  //   browserPreferedLanguage,
  //   browserLanguages,
  //   userPlatform,
  //   browserOnline,
  //   mobile,
  //   referrer,
  // } from "../browserData";

  // console.log(
  //   browserName + "\n",
  //   userAgent + "\n",
  //   browserPreferedLanguage + "\n",
  //   browserLanguages + "\n",
  //   userPlatform + "\n",
  //   "online? " + browserOnline + "\n",
  //   mobile ? mobile + "\n" : "not on a mobile device \n",
  //   referrer + "\n"
  // );