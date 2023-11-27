import { useState, useCallback } from 'react'
import { JSONResponse } from '@shared/types'

export default function useAbortedFetch(url: string, config?: Object){
    const [response, setResponse] = useState<JSONResponse | null>(null)
    const [isRunning, setIsRunning] = useState<Boolean>(false)
    const [controller, setController] = useState<AbortController>(new AbortController())

    const fetcher = useCallback(async (controller: AbortController, query: object) => {
        const finalURL = query ? url + '?' + new URLSearchParams(query as any).toString() : url
        return await fetch(finalURL, { ...config, signal: controller.signal })
            .then(response => response.json())
            .then(response => {
                setResponse(response)
                setIsRunning(false)
            })
            .catch(e => {
                if(e.name === "AbortError"){
                    console.log('aborted')
                }
            })
    }, [])

    const run = (query: object) => {
        
        if(isRunning){
            setController(prevController => {
                prevController.abort()
                const newController = new AbortController()
                fetcher(newController, query)
                return newController 
            })
        } else {
            setIsRunning(true)
            fetcher(controller, query)
        }
    }

    return { run, response }
}