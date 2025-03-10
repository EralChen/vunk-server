import type { Buffer } from 'node:buffer'

declare module 'koa' {
  interface Request {
    /**
     * Get the JSON body of the request
     * @param limit Size limit (defaults to 100kb)
     */
    json: (limit?: string | number) => Promise<any>

    /**
     * Get the traditional form body of the request
     * @param limit Size limit (defaults to 100kb)
     */

    urlencoded: (limit?: string | number) => Promise<any>

    /**
     * Get the body of the request as a text string
     * @param limit Size limit (defaults to 100kb)
     */
    text: (limit?: string | number) => Promise<string>

    /**
     * Get the body of the request as a Buffer
     * @param limit Size limit (defaults to 1mb)
     */
    buffer: (limit?: string | number) => Promise<Buffer>
  }

  interface Response {
    /**
     * Write 100-continue response
     * Used with Expect: 100-continue header
     */
    writeContinue: () => void
  }
}
export {}
