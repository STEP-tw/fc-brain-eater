const ARG_SEPERATOR = "&";

const parse = function(args) {
  let argsObj = {};
  args = args.split(ARG_SEPERATOR);
  args.map(function(arg) {
    let [key, value] = arg.split("=");
    argsObj[key] = value;
  });
  return argsObj;
};

module.exports = parse;
