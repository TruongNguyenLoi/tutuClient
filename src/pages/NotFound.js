import React, {useEffect} from 'react'

export default function NotFound() {

    useEffect(() => {
        document.title = "Không tìm thấy trang"
    }, [])

    return (
        <div>
            Not found
        </div>
    )
}
