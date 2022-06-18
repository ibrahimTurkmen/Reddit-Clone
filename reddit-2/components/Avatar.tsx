import React from 'react'
import { useSession } from 'next-auth/react'
import Image from 'next/image'

type Props = {
    seed?: string
    large?: boolean
}
function Avatar({ seed, large }: Props) {
    const { data: session } = useSession()

    return (
        <div className={`relative overflow-hidden h-10 w-10 rounded-full broder-gray-300 bg-white ${large && 'h-20 w-20'}`}>
            {seed ?
                <Image src={`https://avatars.dicebear.com/api/open-peeps/${seed}.svg`} layout="fill" />
                : <Image src={`https://avatars.dicebear.com/api/open-peeps/${session?.user?.name || 'placeholder'}.svg`} layout="fill" />

            }
        </div>
    )
}

export default Avatar