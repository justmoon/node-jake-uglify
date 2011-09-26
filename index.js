var Step = require('step');
var fs = require('fs');
var uglify = require("uglify-js");
var jsp = uglify.parser;
var pro = uglify.uglify;

exports.minify = function (target) {
  if ('object' !== typeof target) {
    throw new Error('Invalid target definition');
  }
  file(target, minifyHandler, true);
};

function minifyHandler() {
  var inputs = this.prereqs;
  var output = this.name;

  function loadAndMinify(filename, callback) {
    fs.readFile(filename, 'utf8', function (err, src) {
      try {
        if (err) throw err;

        var res = pro.gen_code(pro.ast_squeeze(pro.ast_mangle(jsp.parse(src))));
        callback(null, res);
      } catch (err) {
        callback(err);
      }
    });
  };

  Step(
    function readFiles(err) {
      var group = this.group();
      
      inputs.forEach(function (v) {
        loadAndMinify(v, group());
      });
    },
    function writeResult(err, data) {
      if (err) throw err;
      var output = data.join('\n');

      
    },
    // Jake callback
    complete
  );
};

