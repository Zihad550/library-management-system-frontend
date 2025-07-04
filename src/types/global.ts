import type { BaseQueryApi } from "@reduxjs/toolkit/query";
import type React from "react";

export interface IError {
  data: {
    message: string;
    stack: string;
    success: boolean;
  };
  status: number;
}

export interface IMeta {
  limit: number;
  page: number;
  total: number;
  totalPage: number;
}

export interface IResponse<T> {
  data?: T;
  meta?: IMeta;
  error?: IError;
  success: boolean;
  message: string;
}

export interface IResponseRedux<T> extends IResponse<T>, BaseQueryApi {}

export interface IQueryParam {
  name: string;
  value: boolean | React.Key;
}
