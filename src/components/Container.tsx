import { type ReactNode } from 'react'

export default function Container({ children }: { children: ReactNode }) {
    return (
        <div className='max-w-7xl mx-auto p-2'>
            {children}
        </div>
    )
}