export type BaseResponse<D={}> = {
    resultCode: number
    messages: string[]
    fieldsErrors: string[]
    data: D
}