import React from 'react'
import { ArrowDownIcon, ArrowUpIcon, BookmarkIcon, ChatAltIcon, DotsHorizontalIcon, GiftIcon, ShareIcon } from '@heroicons/react/outline'
import Avatar from './Avatar'
import TimeAgo from 'react-timeago'
import PostFooterBtn from './PostFooterBtn'

type Props = {
    post: Post
}

function Post({ post }: Props) {

    return (
        <div className='flex cursor-pointer rounded-md border border-gray-300 bg-white shadow-sm hover:border hover:border-gray-600'>
            {/* Votes */}
            <div className='flex flex-col items-center  justify-start space-y-1 rounded-l-md bg-gray-50 p-4 text-gray-400'>
                <ArrowUpIcon className='voteButtons hover:text-red-400' />
                <p className='font-bold text-black text-sm'>0</p>
                <ArrowDownIcon className='voteButtons hover:text-blue-400' />

            </div>
            <div className='p-3 pb-1'>
                {/* Header */}
                <div className='flex items-center space-x-2'>
                    <Avatar seed={post.subreddit[0]?.topic} />
                    <p className='text-gray-400 text-sm'>
                        <span className='font-bold text-black hover:text-blue-400'>r/{post.subreddit[0]?.topic}</span> Posted By u/{post.username} <TimeAgo date={post.created_at} />
                    </p>
                </div>


                {/* Body */}
                <div className='py-4'>
                    <h2 className='text-xl font-semibold'>{post?.title}</h2>
                    <p className='mt-2 text-sm font-light'>{post.body}</p>
                </div>

                {/* Image */}
                <img className='w-full' src={post?.image} />
                {/* Footer */}
                <div className='flex space-x-4 text-gray-400 mt-2'>
                    <PostFooterBtn Icon={ChatAltIcon} title={post?.comments?.length + ' Comments'} />
                    <PostFooterBtn Icon={GiftIcon} title={' Award'} />
                    <PostFooterBtn Icon={ShareIcon} title={' Share'} />
                    <PostFooterBtn Icon={BookmarkIcon} title={' Save'} />
                    <PostFooterBtn Icon={DotsHorizontalIcon} title={''} />
                </div>
            </div>

        </div>
    )
}

export default Post