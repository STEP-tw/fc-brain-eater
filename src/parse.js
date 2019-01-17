const parse = function(args) {
  let argsObj = {};
  args = args.split("&");
  args.map(function(arg) {
    let [key, value] = arg.split("=");
    argsObj[key] = value;
  });
  return argsObj;
};

module.exports = parse;
