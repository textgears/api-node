//
// Copyright (c) 2019, Alexander Yakovlev <insbrook@gmail.com>
//
//   Permission to use, copy, modify, and/or distribute this software for any
// purpose with or without fee is hereby granted, provided that the above
// copyright notice and this permission notice appear in all copies.
//
//   THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
// WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
// MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
// ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
// WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
// ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
// OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
//
'use strict'

const proxyquire = require('proxyquire');
const assert = require('assert');
const api = require('../api');

const noCallThruStub = fn => {
    fn['@noCallThru'] = true;
    return fn;
};

describe('textgears', function () {

    it('should throw Error when the API key is missing', function () {
        const textgears = proxyquire('../index', {
            './api': noCallThruStub(() => {}),
            './jsonrequest': noCallThruStub(() => Promise.resolve()),
        });
        assert.throws(
            () => {
                return textgears()
            },
            {
                name: 'Error',
                message: 'Invalid API key',
            }
        );
    });

    it('should throw Error when apiBaseUrl is empty', function () {
        const textgears = proxyquire('../index', {
            './api': noCallThruStub(() => {}),
            './jsonrequest': noCallThruStub(() => Promise.resolve()),
        });
        assert.throws(
            () => {
                return textgears('someKey', {endpoint: ''})
            },
            {
                name: 'Error',
                message: 'Empty API endpoint',
            }
        );
    });

    it('should return valid object', function () {
        const textgears = proxyquire('../index', {
            './api': api,
            './jsonrequest': noCallThruStub(() => Promise.resolve()),
        });

        return typeof textgears('someKey') == "object";
    });

    it('should provide spell check', function () {
        const textgears = proxyquire('../index', {
            './api': api,
            './jsonrequest': noCallThruStub(() => Promise.resolve()),
        });

        return textgears('someKey').checkSpelling('some words');
    });

    //
    // it('should reject empty text checking requests', function () {
    //     const textgears = proxyquire('../index', {
    //         'jsonrequest': noCallThruStub(() => Promise.resolve()),
    //     });
    //     assert.throws(
    //         () => {
    //             return textgears('someKey').checkGrammar();
    //         },
    //         {
    //             name: 'Error',
    //             message: 'Text to check cannot be empty',
    //         }
    //     );
    // });
});

// return textgears().then(
//     () => Promise.reject(new Error('Rejection was expected')),
//     () => {}
// );
//
// return textgears({
//     text: 'I is an enginer',
// }).then(() => Promise.reject(new Error('Rejection was expected')), () => {});

// var assert = require('assert');
//
// describe('Array', function() {
//     describe('#indexOf()', function() {
//         it('should return -1 when the value is not present', function() {
//             assert.equal([1, 2, 3].indexOf(4), -1);
//         });
//     });
// });