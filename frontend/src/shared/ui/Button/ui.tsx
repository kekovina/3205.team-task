interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>{
    
}

export default function Button(props: ButtonProps) {
    const { children, ...restedProps } = props
    return (
        <button className='rounded-2xl bg-blue-400 px-6 py-2 text-white' {...restedProps}>
            {children}
        </button>
    )
}
