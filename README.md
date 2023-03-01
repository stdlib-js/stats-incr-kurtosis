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

# incrkurtosis

[![NPM version][npm-image]][npm-url] [![Build Status][test-image]][test-url] [![Coverage Status][coverage-image]][coverage-url] <!-- [![dependencies][dependencies-image]][dependencies-url] -->

> Compute a [corrected sample excess kurtosis][sample-excess-kurtosis] incrementally.

<section class="intro">

The [kurtosis][sample-excess-kurtosis] for a random variable `X` is defined as

<!-- <equation class="equation" label="eq:kurtosis" align="center" raw="\operatorname{Kurtosis}[X] = \mathrm{E}\biggl[ \biggl( \frac{X - \mu}{\sigma} \biggr)^4 \biggr]" alt="Equation for the kurtosis."> -->

<div class="equation" align="center" data-raw-text="\operatorname{Kurtosis}[X] = \mathrm{E}\biggl[ \biggl( \frac{X - \mu}{\sigma} \biggr)^4 \biggr]" data-equation="eq:kurtosis">
    <img src="https://cdn.jsdelivr.net/gh/stdlib-js/stdlib@49d8cabda84033d55d7b8069f19ee3dd8b8d1496/lib/node_modules/@stdlib/stats/incr/kurtosis/docs/img/equation_kurtosis.svg" alt="Equation for the kurtosis.">
    <br>
</div>

<!-- </equation> -->

Using a univariate normal distribution as the standard of comparison, the [excess kurtosis][sample-excess-kurtosis] is the kurtosis minus `3`.

For a sample of `n` values, the [sample excess kurtosis][sample-excess-kurtosis] is

<!-- <equation class="equation" label="eq:sample_excess_kurtosis" align="center" raw="g_2 = \frac{m_4}{m_2^2} - 3 = \frac{\frac{1}{n} \sum_{i=0}^{n-1} (x_i - \bar{x})^4}{\biggl(\frac{1}{n} \sum_{i=0}^{n-1} (x_i - \bar{x})^2\biggr)^2}" alt="Equation for the sample excess kurtosis."> -->

<div class="equation" align="center" data-raw-text="g_2 = \frac{m_4}{m_2^2} - 3 = \frac{\frac{1}{n} \sum_{i=0}^{n-1} (x_i - \bar{x})^4}{\biggl(\frac{1}{n} \sum_{i=0}^{n-1} (x_i - \bar{x})^2\biggr)^2}" data-equation="eq:sample_excess_kurtosis">
    <img src="https://cdn.jsdelivr.net/gh/stdlib-js/stdlib@49d8cabda84033d55d7b8069f19ee3dd8b8d1496/lib/node_modules/@stdlib/stats/incr/kurtosis/docs/img/equation_sample_excess_kurtosis.svg" alt="Equation for the sample excess kurtosis.">
    <br>
</div>

<!-- </equation> -->

where `m_4` is the sample fourth central moment and `m_2` is the sample second central moment.

The previous equation is, however, a biased estimator of the population excess kurtosis. An alternative estimator which is unbiased under normality is

<!-- <equation class="equation" label="eq:corrected_sample_excess_kurtosis" align="center" raw="G_2 = \frac{(n+1)n}{(n-1)(n-2)(n-3)} \frac{\sum_{i=0}^{n-1} (x_i - \bar{x})^4}{\biggl(\sum_{i=0}^{n-1} (x_i - \bar{x})^2\biggr)^2} - 3 \frac{(n-1)^2}{(n-2)(n-3)}" alt="Equation for the corrected sample excess kurtosis."> -->

<div class="equation" align="center" data-raw-text="G_2 = \frac{(n+1)n}{(n-1)(n-2)(n-3)} \frac{\sum_{i=0}^{n-1} (x_i - \bar{x})^4}{\biggl(\sum_{i=0}^{n-1} (x_i - \bar{x})^2\biggr)^2} - 3 \frac{(n-1)^2}{(n-2)(n-3)}" data-equation="eq:corrected_sample_excess_kurtosis">
    <img src="https://cdn.jsdelivr.net/gh/stdlib-js/stdlib@49d8cabda84033d55d7b8069f19ee3dd8b8d1496/lib/node_modules/@stdlib/stats/incr/kurtosis/docs/img/equation_corrected_sample_excess_kurtosis.svg" alt="Equation for the corrected sample excess kurtosis.">
    <br>
</div>

<!-- </equation> -->

</section>

<!-- /.intro -->



<section class="usage">

## Usage

```javascript
import incrkurtosis from 'https://cdn.jsdelivr.net/gh/stdlib-js/stats-incr-kurtosis@esm/index.mjs';
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
<script type="module">

import randu from 'https://cdn.jsdelivr.net/gh/stdlib-js/random-base-randu@esm/index.mjs';
import incrkurtosis from 'https://cdn.jsdelivr.net/gh/stdlib-js/stats-incr-kurtosis@esm/index.mjs';

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

This package is part of [stdlib][stdlib], a standard library with an emphasis on numerical and scientific computing. The library provides a collection of robust, high performance libraries for mathematics, statistics, streams, utilities, and more.

For more information on the project, filing bug reports and feature requests, and guidance on how to develop [stdlib][stdlib], see the main project [repository][stdlib].

#### Community

[![Chat][chat-image]][chat-url]

---

## License

See [LICENSE][stdlib-license].


## Copyright

Copyright &copy; 2016-2023. The Stdlib [Authors][stdlib-authors].

</section>

<!-- /.stdlib -->

<!-- Section for all links. Make sure to keep an empty line after the `section` element and another before the `/section` close. -->

<section class="links">

[npm-image]: http://img.shields.io/npm/v/@stdlib/stats-incr-kurtosis.svg
[npm-url]: https://npmjs.org/package/@stdlib/stats-incr-kurtosis

[test-image]: https://github.com/stdlib-js/stats-incr-kurtosis/actions/workflows/test.yml/badge.svg?branch=main
[test-url]: https://github.com/stdlib-js/stats-incr-kurtosis/actions/workflows/test.yml?query=branch:main

[coverage-image]: https://img.shields.io/codecov/c/github/stdlib-js/stats-incr-kurtosis/main.svg
[coverage-url]: https://codecov.io/github/stdlib-js/stats-incr-kurtosis?branch=main

<!--

[dependencies-image]: https://img.shields.io/david/stdlib-js/stats-incr-kurtosis.svg
[dependencies-url]: https://david-dm.org/stdlib-js/stats-incr-kurtosis/main

-->

[chat-image]: https://img.shields.io/gitter/room/stdlib-js/stdlib.svg
[chat-url]: https://gitter.im/stdlib-js/stdlib/

[stdlib]: https://github.com/stdlib-js/stdlib

[stdlib-authors]: https://github.com/stdlib-js/stdlib/graphs/contributors

[umd]: https://github.com/umdjs/umd
[es-module]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules

[deno-url]: https://github.com/stdlib-js/stats-incr-kurtosis/tree/deno
[umd-url]: https://github.com/stdlib-js/stats-incr-kurtosis/tree/umd
[esm-url]: https://github.com/stdlib-js/stats-incr-kurtosis/tree/esm
[branches-url]: https://github.com/stdlib-js/stats-incr-kurtosis/blob/main/branches.md

[stdlib-license]: https://raw.githubusercontent.com/stdlib-js/stats-incr-kurtosis/main/LICENSE

[sample-excess-kurtosis]: https://en.wikipedia.org/wiki/Kurtosis

[@joanes:1998]: http://onlinelibrary.wiley.com/doi/10.1111/1467-9884.00122/

<!-- <related-links> -->

[@stdlib/stats/incr/mean]: https://github.com/stdlib-js/stats-incr-mean/tree/esm

[@stdlib/stats/incr/skewness]: https://github.com/stdlib-js/stats-incr-skewness/tree/esm

[@stdlib/stats/incr/stdev]: https://github.com/stdlib-js/stats-incr-stdev/tree/esm

[@stdlib/stats/incr/summary]: https://github.com/stdlib-js/stats-incr-summary/tree/esm

[@stdlib/stats/incr/variance]: https://github.com/stdlib-js/stats-incr-variance/tree/esm

<!-- </related-links> -->

</section>

<!-- /.links -->
