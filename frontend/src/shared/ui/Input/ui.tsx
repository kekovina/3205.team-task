
import { forwardRef } from 'react'
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement>{
    label?: string | undefined
}

export default forwardRef<HTMLInputElement, InputProps>(function Input( { label, name, ...props }, ref) {
    return (<div className="flex flex-col my-2">
        { label && <label htmlFor={name}>{label}</label>}
        <input className="border border-black py-2 px-4 rounded-xl" name={name} ref={ref} {...props} />
    </div>)
})

