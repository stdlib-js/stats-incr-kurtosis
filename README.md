<!--

@license Apache-2.0

Copyright (c) 2018 The Stdlib Authors.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

-->


<details>
  <summary>
    About stdlib...
  </summary>
  <p>We believe in a future in which the web is a preferred environment for numerical computation. To help realize this future, we've built stdlib. stdlib is a standard library, with an emphasis on numerical and scientific computation, written in JavaScript (and C) for execution in browsers and in Node.js.</p>
  <p>The library is fully decomposable, being architected in such a way that you can swap out and mix and match APIs and functionality to cater to your exact preferences and use cases.</p>
  <p>When you use stdlib, you can be absolutely certain that you are using the most thorough, rigorous, well-written, studied, documented, tested, measured, and high-quality code out there.</p>
  <p>To join us in bringing numerical computing to the web, get started by checking us out on <a href="https://github.com/stdlib-js/stdlib">GitHub</a>, and please consider <a href="https://opencollective.com/stdlib">financially supporting stdlib</a>. We greatly appreciate your continued support!</p>
</details>

# incrkurtosis

[![NPM version][npm-image]][npm-url] [![Build Status][test-image]][test-url] [![Coverage Status][coverage-image]][coverage-url] <!-- [![dependencies][dependencies-image]][dependencies-url] -->

> Compute a [corrected sample excess kurtosis][sample-excess-kurtosis] incrementally.

<section class="intro">

The [kurtosis][sample-excess-kurtosis] for a random variable `X` is defined as

<!-- <equation class="equation" label="eq:kurtosis" align="center" raw="\operatorname{Kurtosis}[X] = \mathrm{E}\biggl[ \biggl( \frac{X - \mu}{\sigma} \biggr)^4 \biggr]" alt="Equation for the kurtosis."> -->

```math
\mathop{\mathrm{Kurtosis}}[X] = \mathrm{E}\biggl[ \biggl( \frac{X - \mu}{\sigma} \biggr)^4 \biggr]
```

<!-- <div class="equation" align="center" data-raw-text="\operatorname{Kurtosis}[X] = \mathrm{E}\biggl[ \biggl( \frac{X - \mu}{\sigma} \biggr)^4 \biggr]" data-equation="eq:kurtosis">
    <img src="https://cdn.jsdelivr.net/gh/stdlib-js/stdlib@49d8cabda84033d55d7b8069f19ee3dd8b8d1496/lib/node_modules/@stdlib/stats/incr/kurtosis/docs/img/equation_kurtosis.svg" alt="Equation for the kurtosis.">
    <br>
</div> -->

<!-- </equation> -->

Using a univariate normal distribution as the standard of comparison, the [excess kurtosis][sample-excess-kurtosis] is the kurtosis minus `3`.

For a sample of `n` values, the [sample excess kurtosis][sample-excess-kurtosis] is

<!-- <equation class="equation" label="eq:sample_excess_kurtosis" align="center" raw="g_2 = \frac{m_4}{m_2^2} - 3 = \frac{\frac{1}{n} \displaystyle\sum_{i=0}^{n-1} (x_i - \bar{x})^4}{\biggl(\frac{1}{n} \displaystyle\sum_{i=0}^{n-1} (x_i - \bar{x})^2\biggr)^2}" alt="Equation for the sample excess kurtosis."> -->

```math
g_2 = \frac{m_4}{m_2^2} - 3 = \frac{\frac{1}{n} \displaystyle\sum_{i=0}^{n-1} (x_i - \bar{x})^4}{\biggl(\frac{1}{n} \displaystyle\sum_{i=0}^{n-1} (x_i - \bar{x})^2\biggr)^2}
```

<!-- <div class="equation" align="center" data-raw-text="g_2 = \frac{m_4}{m_2^2} - 3 = \frac{\frac{1}{n} \displaystyle\sum_{i=0}^{n-1} (x_i - \bar{x})^4}{\biggl(\frac{1}{n} \displaystyle\sum_{i=0}^{n-1} (x_i - \bar{x})^2\biggr)^2}" data-equation="eq:sample_excess_kurtosis">
    <img src="https://cdn.jsdelivr.net/gh/stdlib-js/stdlib@49d8cabda84033d55d7b8069f19ee3dd8b8d1496/lib/node_modules/@stdlib/stats/incr/kurtosis/docs/img/equation_sample_excess_kurtosis.svg" alt="Equation for the sample excess kurtosis.">
    <br>
</div> -->

<!-- </equation> -->

where `m_4` is the sample fourth central moment and `m_2` is the sample second central moment.

The previous equation is, however, a biased estimator of the population excess kurtosis. An alternative estimator which is unbiased under normality is

<!-- <equation class="equation" label="eq:corrected_sample_excess_kurtosis" align="center" raw="G_2 = \frac{(n+1)n}{(n-1)(n-2)(n-3)} \frac{\displaystyle\sum_{i=0}^{n-1} (x_i - \bar{x})^4}{\biggl(\displaystyle\sum_{i=0}^{n-1} (x_i - \bar{x})^2\biggr)^2} - 3 \frac{(n-1)^2}{(n-2)(n-3)}" alt="Equation for the corrected sample excess kurtosis."> -->

```math
G_2 = \frac{(n+1)n}{(n-1)(n-2)(n-3)} \frac{\displaystyle\sum_{i=0}^{n-1} (x_i - \bar{x})^4}{\biggl(\displaystyle\sum_{i=0}^{n-1} (x_i - \bar{x})^2\biggr)^2} - 3 \frac{(n-1)^2}{(n-2)(n-3)}
```

<!-- <div class="equation" align="center" data-raw-text="G_2 = \frac{(n+1)n}{(n-1)(n-2)(n-3)} \frac{\displaystyle\sum_{i=0}^{n-1} (x_i - \bar{x})^4}{\biggl(\displaystyle\sum_{i=0}^{n-1} (x_i - \bar{x})^2\biggr)^2} - 3 \frac{(n-1)^2}{(n-2)(n-3)}" data-equation="eq:corrected_sample_excess_kurtosis">
    <img src="https://cdn.jsdelivr.net/gh/stdlib-js/stdlib@49d8cabda84033d55d7b8069f19ee3dd8b8d1496/lib/node_modules/@stdlib/stats/incr/kurtosis/docs/img/equation_corrected_sample_excess_kurtosis.svg" alt="Equation for the corrected sample excess kurtosis.">
    <br>
</div> -->

<!-- </equation> -->

</section>

<!-- /.intro -->



<section class="usage">

## Usage

To use in Observable,

```javascript
incrkurtosis = require( 'https://cdn.jsdelivr.net/gh/stdlib-js/stats-incr-kurtosis@umd/browser.js' )
```
The previous example will load the latest bundled code from the umd branch. Alternatively, you may load a specific version by loading the file from one of the [tagged bundles](https://github.com/stdlib-js/stats-incr-kurtosis/tags). For example,

```javascript
incrkurtosis = require( 'https://cdn.jsdelivr.net/gh/stdlib-js/stats-incr-kurtosis@v0.2.2-umd/browser.js' )
```

To vendor stdlib functionality and avoid installing dependency trees for Node.js, you can use the UMD server build:

```javascript
var incrkurtosis = require( 'path/to/vendor/umd/stats-incr-kurtosis/index.js' )
```

To include the bundle in a webpage,

```html
<script type="text/javascript" src="https://cdn.jsdelivr.net/gh/stdlib-js/stats-incr-kurtosis@umd/browser.js"></script>
```

If no recognized module system is present, access bundle contents via the global scope:

```html
<script type="text/javascript">
(function () {
    window.incrkurtosis;
})();
</script>
```

#### incrkurtosis()

Returns an accumulator `function` which incrementally computes a [corrected sample excess kurtosis][sample-excess-kurtosis].

```javascript
var accumulator = incrkurtosis();
```

#### accumulator( \[x] )

If provided an input value `x`, the accumulator function returns an updated [corrected sample excess kurtosis][sample-excess-kurtosis]. If not provided an input value `x`, the accumulator function returns the current [corrected sample excess kurtosis][sample-excess-kurtosis].

```javascript
var accumulator = incrkurtosis();

var kurtosis = accumulator( 2.0 );
// returns null

kurtosis = accumulator( 2.0 );
// returns null

kurtosis = accumulator( -4.0 );
// returns null

kurtosis = accumulator( -4.0 );
// returns -6.0
```

</section>

<!-- /.usage -->

<section class="notes">

## Notes

-   Input values are **not** type checked. If provided `NaN` or a value which, when used in computations, results in `NaN`, the accumulated value is `NaN` for **all** future invocations. If non-numeric inputs are possible, you are advised to type check and handle accordingly **before** passing the value to the accumulator function.

</section>

<!-- /.notes -->

<section class="examples">

## Examples

<!-- eslint no-undef: "error" -->

```html
<!DOCTYPE html>
<html lang="en">
<body>
<script type="text/javascript" src="https://cdn.jsdelivr.net/gh/stdlib-js/random-base-randu@umd/browser.js"></script>
<script type="text/javascript" src="https://cdn.jsdelivr.net/gh/stdlib-js/stats-incr-kurtosis@umd/browser.js"></script>
<script type="text/javascript">
(function () {

var accumulator;
var v;
var i;

// Initialize an accumulator:
accumulator = incrkurtosis();

// For each simulated datum, update the corrected sample excess kurtosis...
for ( i = 0; i < 100; i++ ) {
    v = randu() * 100.0;
    accumulator( v );
}
console.log( accumulator() );

})();
</script>
</body>
</html>
```

</section>

<!-- /.examples -->

* * *

<section class="references">

## References

-   Joanes, D. N., and C. A. Gill. 1998. "Comparing measures of sample skewness and kurtosis." _Journal of the Royal Statistical Society: Series D (The Statistician)_ 47 (1). Blackwell Publishers Ltd: 183–89. doi:[10.1111/1467-9884.00122][@joanes:1998].

</section>

<!-- /.references -->

<!-- Section for related `stdlib` packages. Do not manually edit this section, as it is automatically populated. -->

<section class="related">

* * *

## See Also

-   <span class="package-name">[`@stdlib/stats-incr/mean`][@stdlib/stats/incr/mean]</span><span class="delimiter">: </span><span class="description">compute an arithmetic mean incrementally.</span>
-   <span class="package-name">[`@stdlib/stats-incr/skewness`][@stdlib/stats/incr/skewness]</span><span class="delimiter">: </span><span class="description">compute a corrected sample skewness incrementally.</span>
-   <span class="package-name">[`@stdlib/stats-incr/stdev`][@stdlib/stats/incr/stdev]</span><span class="delimiter">: </span><span class="description">compute a corrected sample standard deviation incrementally.</span>
-   <span class="package-name">[`@stdlib/stats-incr/summary`][@stdlib/stats/incr/summary]</span><span class="delimiter">: </span><span class="description">compute a statistical summary incrementally.</span>
-   <span class="package-name">[`@stdlib/stats-incr/variance`][@stdlib/stats/incr/variance]</span><span class="delimiter">: </span><span class="description">compute an unbiased sample variance incrementally.</span>

</section>

<!-- /.related -->

<!-- Section for all links. Make sure to keep an empty line after the `section` element and another before the `/section` close. -->


<section class="main-repo" >

* * *

## Notice

This package is part of [stdlib][stdlib], a standard library for JavaScript and Node.js, with an emphasis on numerical and scientific computing. The library provides a collection of robust, high performance libraries for mathematics, statistics, streams, utilities, and more.

For more information on the project, filing bug reports and feature requests, and guidance on how to develop [stdlib][stdlib], see the main project [repository][stdlib].

#### Community

[![Chat][chat-image]][chat-url]

---

## License

See [LICENSE][stdlib-license].


## Copyright

Copyright &copy; 2016-2024. The Stdlib [Authors][stdlib-authors].

</section>

<!-- /.stdlib -->

<!-- Section for all links. Make sure to keep an empty line after the `section` element and another before the `/section` close. -->

<section class="links">

[npm-image]: http://img.shields.io/npm/v/@stdlib/stats-incr-kurtosis.svg
[npm-url]: https://npmjs.org/package/@stdlib/stats-incr-kurtosis

[test-image]: https://github.com/stdlib-js/stats-incr-kurtosis/actions/workflows/test.yml/badge.svg?branch=v0.2.2
[test-url]: https://github.com/stdlib-js/stats-incr-kurtosis/actions/workflows/test.yml?query=branch:v0.2.2

[coverage-image]: https://img.shields.io/codecov/c/github/stdlib-js/stats-incr-kurtosis/main.svg
[coverage-url]: https://codecov.io/github/stdlib-js/stats-incr-kurtosis?branch=main

<!--

[dependencies-image]: https://img.shields.io/david/stdlib-js/stats-incr-kurtosis.svg
[dependencies-url]: https://david-dm.org/stdlib-js/stats-incr-kurtosis/main

-->

[chat-image]: https://img.shields.io/gitter/room/stdlib-js/stdlib.svg
[chat-url]: https://app.gitter.im/#/room/#stdlib-js_stdlib:gitter.im

[stdlib]: https://github.com/stdlib-js/stdlib

[stdlib-authors]: https://github.com/stdlib-js/stdlib/graphs/contributors

[umd]: https://github.com/umdjs/umd
[es-module]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules

[deno-url]: https://github.com/stdlib-js/stats-incr-kurtosis/tree/deno
[deno-readme]: https://github.com/stdlib-js/stats-incr-kurtosis/blob/deno/README.md
[umd-url]: https://github.com/stdlib-js/stats-incr-kurtosis/tree/umd
[umd-readme]: https://github.com/stdlib-js/stats-incr-kurtosis/blob/umd/README.md
[esm-url]: https://github.com/stdlib-js/stats-incr-kurtosis/tree/esm
[esm-readme]: https://github.com/stdlib-js/stats-incr-kurtosis/blob/esm/README.md
[branches-url]: https://github.com/stdlib-js/stats-incr-kurtosis/blob/main/branches.md

[stdlib-license]: https://raw.githubusercontent.com/stdlib-js/stats-incr-kurtosis/main/LICENSE

[sample-excess-kurtosis]: https://en.wikipedia.org/wiki/Kurtosis

[@joanes:1998]: http://onlinelibrary.wiley.com/doi/10.1111/1467-9884.00122/

<!-- <related-links> -->

[@stdlib/stats/incr/mean]: https://github.com/stdlib-js/stats-incr-mean/tree/umd

[@stdlib/stats/incr/skewness]: https://github.com/stdlib-js/stats-incr-skewness/tree/umd

[@stdlib/stats/incr/stdev]: https://github.com/stdlib-js/stats-incr-stdev/tree/umd

[@stdlib/stats/incr/summary]: https://github.com/stdlib-js/stats-incr-summary/tree/umd

[@stdlib/stats/incr/variance]: https://github.com/stdlib-js/stats-incr-variance/tree/umd

<!-- </related-links> -->

</section>

<!-- /.links -->
