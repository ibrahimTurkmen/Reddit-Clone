import Image from 'next/image'
import React from 'react'
import { signIn, useSession, signOut } from 'next-auth/react'
import { SparklesIcon, GlobeIcon, VideoCameraIcon, BellIcon, PlusIcon, SpeakerphoneIcon, MenuIcon, UserIcon } from '@heroicons/react/outline'

import { HomeIcon, ChevronDownIcon, SearchIcon } from '@heroicons/react/solid'

function Header() {
    const { data: session } = useSession();
    return (
        <div className='sticky top-0 z-50 flex bg-white px-4 py-2 shadow-sm'>
            <div className='relative h-10 w-20 flex-shrink-0 cursor-pointer'>
                <Image
                    objectFit='contain'
                    src="https://upload.wikimedia.org/wikipedia/en/5/58/Reddit_logo_new.svg"
                    layout='fill'
                />
            </div>
            <div className='flex items-center mx-7  lg:min-w-[150px] xl:min-w-[300px]'>
                <HomeIcon className='h-5 w-5' />
                <p className='flex-1 ml-2 hidden lg:inline'>Home</p>
                <ChevronDownIcon className='h-5 w-5' />
            </div>

            {/* Search Box */}

            <form className='flex px-2 flex-1 items-center space-x-2 rounded-sm border border-gray-200 bg-gray-100'>
                <SearchIcon className='w-5 h-5' />
                <input className='flex-1 bg-transparent outline-none' type="text" placeholder='Search Reddit' />
                <button type='submit' hidden />
            </form>

            <div className='mx-5 hidden lg:inline-flex text-gray-500 space-x-2'>
                <SparklesIcon className='icon' />
                <GlobeIcon className='icon' />
                <VideoCameraIcon className='icon' />
                <hr className='h-10 border border-gray-100' />
                <BellIcon className='icon' />
                <PlusIcon className='icon' />
                <SpeakerphoneIcon className='icon' />
            </div>

            <div className='ml-5 flex items-center lg:hidden'>
                <MenuIcon className='icon' />
            </div>

            {/* Sing Buttons */}
            {session ? (<div onClick={() => signOut()} className='hidden cursor-pointer items-center   border border-gray-100 lg:flex'>
                <div className='flex-shrink-0'>
                    <UserIcon className='icon' />
                </div>
                <div className='flex-1 text-xs'>
                    <p className='truncate'>{session?.user?.name}</p>
                    <p className='text-gray-500 px-2'>Sign Out</p>
                </div>
                <ChevronDownIcon className='h-5 flex-shrink-0 text-gray-400' />
            </div>) : (
                <div onClick={() => signIn()} className='hidden cursor-pointer items-center   border border-gray-100 lg:flex'>
                    <div className='flex-shrink-0'>
                        <UserIcon className='icon' />
                    </div>
                    <p className='text-gray-500 px-2'>Sign In</p>
                </div>
            )}


        </div>

    )
}

export default Header