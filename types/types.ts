import { Request } from 'express';

type QueryParams = {
    [k: string]: string;
};

type BodyParams = {
    [k: string]: string[] | undefined;
};

export type RequestWithBodyParams = Request<object, object, BodyParams, object>;
export type RequestWithQueryParams = Request<
    object,
    object,
    object,
    QueryParams
>;
