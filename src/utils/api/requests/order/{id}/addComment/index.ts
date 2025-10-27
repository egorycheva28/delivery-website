import { instance } from '../../../../instance';

export type PutAddCommentParams = {
    orderId: string,
    comment: string
};

export type PutAddCommentConfig = RequestConfig<PutAddCommentParams>;

export const putAddComment = async ({ config, params }: PutAddCommentConfig) =>
    instance.put(`http://localhost:8080/api/order/comment/${params.orderId}?comment=${params.comment}`, config);