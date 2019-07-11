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

declare module "textgears-api" {
    /**
     * Base module function
     * @param key
     * @param options
     * @constructor
     */
    function Textgears(
        key: any,
        options?: any
    ): ITextgearsApi;

    namespace Textgears {}
    export default Textgears;
}

/**
 * Text processing options
 */
interface IRequestOptions {
    language?: string
}

/**
 *  Text checking options
 */
interface ICheckRequestOptions extends IRequestOptions {
    rules: any[]; // @TODO implement rules list
}

/**
 * Api provider interface
 */
interface ITextgearsApi {
    /**
     * Spell checking
     * @param text
     * @param options
     */
    checkSpelling(text: string, options?: ICheckRequestOptions): Promise<any>;

    /**
     * Grammar checking
     * @param text
     * @param options
     */
    checkGrammar(text: string, options?: ICheckRequestOptions): Promise<any>;

    /**
     * Calculate text readability
     * @param text
     * @param options
     */
    checkReadability(text: string, options?: ICheckRequestOptions): Promise<any>;

    /**
     * Check grammar + calc text metrics
     * @param text
     * @param options
     */
    analyzeText(text: string, options?: IRequestOptions): Promise<any>;

    /**
     * Get API usage stats grouped by date
     * @param periodStart
     * @param periodEnd
     */
    getAccountUsage(periodStart?: number | string | Date, periodEnd?: number | string | Date): Promise<any>;

    /**
     *  Get a list of available API quota
     */
    getAccountResourceQuota(): Promise<any>;

    /**
     * Get a list of recent payments
     */
    getAccountPayments(): Promise<any>;
}
