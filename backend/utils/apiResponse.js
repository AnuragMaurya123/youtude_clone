export class ApiResponse {
    constructor(
        statusCode,
        success,
        data,
        message="Success"
    ){
        this.statusCode=statusCode,
        this.data=data,
        this.message=message,
        this.success=success<400
    }
}