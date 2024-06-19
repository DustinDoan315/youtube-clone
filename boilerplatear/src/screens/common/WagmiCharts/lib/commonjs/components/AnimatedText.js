"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AnimatedText = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
var _reactNativeReanimated = _interopRequireWildcard(require("react-native-reanimated"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// forked from https://github.com/wcandillon/react-native-redash/blob/master/src/ReText.tsx

_reactNativeReanimated.default.addWhitelistedNativeProps({
  text: true
});
const AnimatedTextInput = _reactNativeReanimated.default.createAnimatedComponent(_reactNative.TextInput);
const AnimatedText = ({
  text,
  style
}) => {
  const inputRef = _react.default.useRef(null); // eslint-disable-line @typescript-eslint/no-explicit-any

  if (_reactNative.Platform.OS === 'web') {
    // For some reason, the worklet reaction evaluates upfront regardless of any
    // conditionals within it, causing Android to crash upon the invokation of `setNativeProps`.
    // We are going to break the rules of hooks here so it doesn't invoke `useAnimatedReaction`
    // for platforms outside of the web.

    // eslint-disable-next-line react-hooks/rules-of-hooks
    (0, _reactNativeReanimated.useAnimatedReaction)(() => {
      return text.value;
    }, (data, prevData) => {
      if (data !== prevData && inputRef.current) {
        inputRef.current.value = data;
      }
    }, [text]);
  }
  const animatedProps = (0, _reactNativeReanimated.useAnimatedProps)(() => {
    return {
      text: text.value
      // Here we use any because the text prop is not available in the type
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    };
  });
  return /*#__PURE__*/_react.default.createElement(AnimatedTextInput, {
    underlineColorAndroid: "transparent",
    editable: false,
    ref: _reactNative.Platform.select({
      web: inputRef
    }),
    value: text.value,
    style: [styles.text, style],
    animatedProps: animatedProps
  });
};
exports.AnimatedText = AnimatedText;
const styles = _reactNative.StyleSheet.create({
  text: {
    color: 'black'
  }
});
//# sourceMappingURL=AnimatedText.js.map