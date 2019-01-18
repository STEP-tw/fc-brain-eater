const ARG_SEPERATOR = "&";

const parse = function(args) {
  let argsObj = {};
  args = args.split(ARG_SEPERATOR);
  args.map(function(arg) {
    let [key, value] = arg.split("=");
    key = unescape(key);
    value = unescape(value);
    argsObj[key] = value;
  });
  return argsObj;
};

module.exports = parse;
