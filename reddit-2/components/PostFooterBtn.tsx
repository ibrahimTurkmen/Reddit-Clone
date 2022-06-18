import React from 'react'

type Props = {
    title: String
    Icon: Svg
}

function PostFooterBtn({ title, Icon }: Props) {
    return (
        <div className='postButtons'>
            <Icon className='h-6 w-6' />
            <p className='hidden sm:inline'>{title}</p>
        </div>
    )
}

export default PostFooterBtn