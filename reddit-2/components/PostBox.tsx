import React, { useState } from 'react'
import { useSession } from 'next-auth/react'
import Avatar from './Avatar'
import { PhotographIcon, LinkIcon } from '@heroicons/react/outline'
import { useForm, SubmitHandler } from "react-hook-form";
import { useMutation } from '@apollo/client';
import { ADD_POST, ADD_SUBREDDIT } from '../graphql/mutations';
import client from '../apollo-client';
import { GET_ALL_POSTS, GET_SUBREDDIT_BY_TOPIC } from '../graphql/queries';
import toast from 'react-hot-toast';

function PostBox() {
    const { data: session } = useSession()
    const [addPost] = useMutation(ADD_POST, {
        refetchQueries: [GET_ALL_POSTS,'getPostList']
    })
    const [addSubreddit] = useMutation(ADD_SUBREDDIT)
    console.log('session =>',session)
    type FormData = {
        postTitle: string
        postBody: string
        postImage: string
        subreddit: string
    }
    const [imageBoxOpen, setImageBoxOpen] = useState<boolean>(false)

    const { register, setValue, handleSubmit, watch, formState: { errors } } = useForm<FormData>()
    const onSubmit = handleSubmit(async (formData) => {
        const notification = toast.loading('Creating New Post!')
        console.log('formData', formData)
        try {
            const { data: { getSubredditListByTopic } } = await client.query({
                query: GET_SUBREDDIT_BY_TOPIC,
                variables: {
                    topic: formData.subreddit
                }
            })
            const subredditExist = getSubredditListByTopic.length > 0;
            if (!subredditExist) {
                // create subreddit.
                const { data: { insertSubreddit: newSubreddit } } = await addSubreddit({
                    variables: {
                        topic: formData.subreddit
                    }
                })

                console.log('Creat post', formData)
                const image = formData.postImage || ''

                const { data: { insertPost: newPost } } = await addPost({
                    variables: {
                        body: formData.postBody,
                        image: image,
                        subreddit_id: newSubreddit.id,
                        title: formData.postTitle,
                        username: session?.user?.name
                    }
                })
                console.log('newPost =>', newPost)

                // After the post has been added
            } else {

                //use existing sub.

                const image = formData.postImage || ''
                console.log('getSubredditListByTopic =>', getSubredditListByTopic)
                const { data: { insertPost: newPost } } = await addPost({
                    variables: {
                        body: formData.postBody,
                        image: image,
                        subreddit_id: getSubredditListByTopic[0].id,
                        title: formData.postTitle,
                        username: session?.user?.name
                    }
                })

                console.log('newPost Added: =>', newPost)

            }

            setValue('postBody', '');
            setValue('postImage', '');
            setValue('postTitle', '');
            setValue('subreddit', '');
            toast.success('New Post Created!', {
                id: notification
            })
        } catch (error) {
            toast.error('Whoops', {
                id: notification
            })
        }
    })
    return (
        <form onSubmit={onSubmit} className='sticky to-16 z-50 bg-white border border-gray-300 rounded-sm'>
            <div className='flex items-center '>
                {/* Avatar */}
                <Avatar />
                <input {...register('postTitle', { required: true })} type="text" disabled={!session} className='bg-gray-50 p-2 outline-none rounded-md flex-1' placeholder={session ? 'Create a post by entering a title' : 'Sign in to post'} />
                <PhotographIcon onClick={() => setImageBoxOpen(!imageBoxOpen)}
                    className={`cursor-pointer h-6 text-gray-300 ${imageBoxOpen && 'text-blue-500'}`}
                />
                <LinkIcon className='cursor-pointer h-6 text-gray-300' />
            </div>
            {!!watch('postTitle') && (
                <div className='flex flex-col py-2'>
                    <div className='flex items-center px-2'>
                        <p className='min-w-[90px]'>Body:</p>
                        <input type="text"
                            placeholder='Text (optinial)'
                            className='m-2 flex-1 p-2 rounded-md bg-blue-50 outline-none'
                            {...register('postBody')}
                        />
                    </div>
                    <div className='flex items-center px-2'>
                        <p className='min-w-[90px]'>Subreddit:</p>
                        <input type="text"
                            placeholder='Text (optinial)'
                            className='m-2 flex-1 p-2 rounded-md bg-blue-50 outline-none'
                            {...register('subreddit', { required: true })}
                        />
                    </div>
                    {
                        imageBoxOpen && (
                            <div className='flex items-center px-2'>
                                <p className='min-w-[90px]'>Image URL:</p>
                                <input type="text"
                                    placeholder='Text (optinial)'
                                    className='m-2 flex-1 p-2 rounded-md bg-blue-50 outline-none'
                                    {...register('postImage')}
                                />
                            </div>
                        )
                    }
                </div>

            )}
            {/* Errors */}
            {
                Object.keys(errors).length > 0 && (
                    <div className='space-y-2 p-2 text-red-500'>
                        {
                            errors.postTitle?.type === 'required' && (
                                <p>- A Post Title is required</p>
                            )
                        }
                        {
                            errors.subreddit?.type === 'required' && (
                                <p>- A Subreddit is required</p>
                            )
                        }
                    </div>
                )
            }

            {watch('postTitle') && <button 
                type='submit'
                className='p-2 text-white w-full bg-blue-400 rounded-full mb-2'>
                Create Post
            </button>}
        </form >
    )
}

export default PostBox