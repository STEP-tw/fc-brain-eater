const ARG_SEPERATOR = "\n";

const parse = function(args) {
  let argsObj = {};
  args = args.split(ARG_SEPERATOR);
  args = [args[0], args.slice(1).join(ARG_SEPERATOR)];
  args.map(function(arg) {
    let [key, value] = arg.split("=");
    argsObj[key] = value;
  });
  return argsObj;
};

module.exports = parse;
