class ApiResponse {
  constructor(data, message = "success", statusCode) {
    this.data = data;
    this.message = message;
    this.statusCode = statusCode;
    this.success = statusCode < 400;
  }
}

export default ApiResponse;
