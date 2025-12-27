import { Request } from "express";

export interface FileRequest extends Request {
    inputType?: string;
}