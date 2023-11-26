import { useState, useRef, useEffect, InputHTMLAttributes, ChangeEvent } from 'react'
import Input from '@shared/ui/Input'

interface MaskedInputProps extends InputHTMLAttributes<HTMLInputElement>{
  label?: string | undefined;
}

export default function MaskedInput(props: MaskedInputProps) {
    const [ _, setMaskedValue ] = useState<string>('')
    const inputRef = useRef<HTMLInputElement | null>(null)

    const handleChange = () => {
      const value = inputRef.current?.value
        .replace(/\D/g, '')
        .match(/(\d{0,2})(\d{0,2})(\d{0,2})/);

      if(inputRef.current){
        inputRef.current.value = value ? 
          `${(value[1] + '__').slice(0, 2)}-${(value[2] + '__').slice(0, 2)}-${(value[3] + '__').slice(0, 2)}` 
          : ''
        const val = inputRef.current.value.replace(/(\D)/g, '')
        
        setMaskedValue((prev) => {
          if(inputRef.current){
              if(!val.length){
                inputRef.current.selectionStart = 0
                inputRef.current.selectionEnd = 0
              } else {
                const cursorPosition = prev.length < val.length 
                  ? val.length + Math.floor(val.length / 2) 
                  : val.length + (Math.floor(val.length / 2)) + (val.length % 2 == 0 ? -1 : 0) 
                inputRef.current.selectionStart = cursorPosition
                inputRef.current.selectionEnd = inputRef.current.selectionStart
              }
          }
          return val
        })
      }
    }

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
      handleChange()
      if(props.onChange) props.onChange(event)
    }

    useEffect(() => {
      handleChange()
    }, [])
    return (
      <Input {...props} ref={inputRef} onChange={onChange}/>
    )
}
