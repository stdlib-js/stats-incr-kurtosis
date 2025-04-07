/*
* @license Apache-2.0
*
* Copyright (c) 2019 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

// TypeScript Version: 4.1

/// <reference types="@stdlib/types"/>

/**
* If provided a value, returns an updated corrected sample excess kurtosis; otherwise, returns the current corrected sample excess kurtosis.
*
* ## Notes
*
* -   If provided `NaN` or a value which, when used in computations, results in `NaN`, the accumulated value is `NaN` for all future invocations.
*
* @param x - value
* @returns corrected sample excess kurtosis
*/
type accumulator = ( x?: number ) => number | null;

/**
* Returns an accumulator function which incrementally computes a corrected sample excess kurtosis.
*
* @returns accumulator function
*
* @example
* var accumulator = incrkurtosis();
*
* var kurtosis = accumulator();
* // returns null
*
* kurtosis = accumulator( 2.0 );
* // returns null
*
* kurtosis = accumulator( 2.0 );
* // returns null
*
* kurtosis = accumulator( -4.0 );
* // returns null
*
* kurtosis = accumulator( -4.0 );
* // returns -6.0
*/
declare function incrkurtosis(): accumulator;


// EXPORTS //

export = incrkurtosis;
