# Usage

Here is a simple example Jakefile.js:

``` js
var minify = require('jake-uglify').minify;

task('default', ['bitcoinjs-min.js']);

desc('General-purpose build containing most features');
minify({'bitcoinjs-min.js': [
    'src/bitcoin.js',
    'src/wallet.js'
]});
```