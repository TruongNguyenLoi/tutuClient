import React, { useEffect } from 'react'
import { getAllCommentByUser } from 'actions/services/CommentServices'
export default function CustomerReview() {

    useEffect(() => {
        getAllCommentByUser()
            .then((res) => {
                console.log(res.data);
            })
    }, [])

    return (
        <div>
           
        </div>
    )
}
