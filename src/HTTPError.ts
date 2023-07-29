
export class HTTPError extends Error {
    constructor (message: string, public code: number) {
        super(message)
        this.code = code
    }
}