import { HttpStatusCode } from "../enums";

export interface ErrorState {
  message: string;
  statusCode: HttpStatusCode;
}