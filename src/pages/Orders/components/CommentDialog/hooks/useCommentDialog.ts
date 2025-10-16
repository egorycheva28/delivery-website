import { useForm } from "react-hook-form";
import type { GetCommentSchema } from "../constants/CommentShema";
import { useEffect } from "react";

export const useCommentDialog = (isComment: boolean,
    setIsComment: (isComment: boolean) => void, order: Order, comment: NewComment,
    setComment: (newComment: NewComment) => void) => {

    const newCommentForm = useForm<GetCommentSchema>({
        defaultValues: {
            comment: comment.newComment || undefined
        }
    })

    const addComment = newCommentForm.handleSubmit(
        (data) => {
            if (data.comment !== undefined) {
                setComment({ newComment: data.comment });
            }
            setIsComment(false)
        }
    )

    useEffect(() => {
        if (!isComment) {
            newCommentForm.reset({
                comment: ''
            })
        }
    }, [isComment])

    return {
        state: {},
        form: newCommentForm,
        functions: { addComment }
    }
}