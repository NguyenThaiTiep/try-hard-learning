import { NextFunction, Request, Response } from "express";
export const handleResponse = (
  response: Response,
  status = 200,
  data = {} as {
    message?: string;
    data?: any;
  }
) => {
  switch (status) {
    case ResponseCode.SERVER_ERROR:
      return response.send({
        message: data.message || "Server thất bại.",
        data: data.data,
        status,
      });

    case ResponseCode.SUCCESS:
      return response.send({
        message: data.message || "Thành công",
        data: data.data,
        status,
      });
    case ResponseCode.NOT_FOUND:
      return response.send({
        message: data.message || "Không tồn tại.",
        data: data.data,
        status,
      });
    case ResponseCode.ACCEPTED:
      return response.send({
        message: data.message || "Chấp nhận",
        data: data.data,
        status,
      });
    case ResponseCode.CREATED:
      return response.send({
        message: data.message || "Tạo dữ liệu thành công.",
        data: data.data,
        status,
      });
    case ResponseCode.BAD_REQUEST:
      return response.send({
        message: data.message || "Dữ liệu không hợp lệ.",
        data: data.data,
        status,
      });
    case ResponseCode.EXISTED:
      return response.send({
        message: data.message || "Đã tồn tại.",
        data: data.data,
        status,
      });
    case ResponseCode.UNAUTHORIZED:
      return response.send({
        message: data.message || "Bạn cần phải đăng nhập.",
        data: data.data,
        status,
      });
    default:
      return response.send({
        message: data.message || "Thất bại.",
        data: data.data,
        status,
      });
  }
};
export enum ResponseCode {
  SUCCESS = 200,
  CREATED = 201,
  ACCEPTED = 202,
  EXISTED = 302,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  NOT_FOUND = 404,
  SERVER_ERROR = 500,
}
export { Response };
