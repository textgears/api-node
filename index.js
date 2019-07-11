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
'use strict';

/**
 * @fileOverview Textgears API module
 * @author Alexander Yakovlev <insbrook@gmail.com>
 */
const extend = require('extend');
const request = require('./jsonrequest');
const api = require('./api');

/**
 * @param {string} key       Required API key param
 * @param {object} options  Sample: {endpoint: string, language: string}
 * @returns {textgears}
 *
 * Default options:
 * {
 *   endpoint: "https://api.textgears.com",
 *   language: "en-US"
 * }
 *
 * You can leave endpoint unset to use default value.
 * Or you can specify the closest endpoint to you:
 * https://us.api.textgears.com - the United State location
 * https://sg.api.textgears.com - Singapore endpoint (works the best for Asia)
 * https://eu.api.textgears.com - European endpoint
 */
function textgears(key, options) {
    const defaultSettings = {
        endpoint: "https://api.textgears.com",
        language: "en-US"
    };
    options = extend(defaultSettings, options);

    if (!key) {
        throw new Error('Invalid API key')
    }

    // Remove trailing slash
    options.endpoint = options.endpoint.replace(/\/$/, "");

    if (!options.endpoint) {
        throw new Error('Empty API endpoint')
    }

    return new textgears.API(request, key, options);
}

module.exports = textgears;
textgears.API = api;
