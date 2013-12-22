
# jit

  Run a function with some amount of jitter (after a random amount of time). [It's a real thing](http://highscalability.com/blog/2012/4/17/youtube-strategy-adding-jitter-isnt-a-bug.html), I swear!

## Usage

You can set timeouts:

```js
var jit = require('jit');

var start = Date.now();

function elapsed () {
  console.log(Date.now() - start);
}

jit(elapsed, 100, 500); // 237
jit(elapsed, 500);      // 458
jit(elapsed, 500, 500); // 501
```

Or you can set jitter-y intervals:

```js
var start = Date.now();

function elapsed () {
  console.log(Date.now() - start);
}

// clear our interval function after 500ms
var clear = jit.interval(elapsed, 100);
setTimeout(clear, 500);
```


#### jit(fn, min, [max])

Runs `fn` within the specified bounds. If no third parameter is specified, attempts to run the function within 0.7 * the input.

#### jit.interval(fn, min, [max])

Runs `fn` on a randomized interval between `min` and `max`. If no `max` is given, then it will treat the second parameter as the `max`. Returns a function to clear the interval


## License

(The MIT License)

Copyright (c) 2013 Calvin French-Owen &lt;calvin@calv.info&gt;

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.