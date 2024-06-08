import { useQuery } from '@tanstack/react-query'
import { getAll } from '../services/anecdotes'

export function useNotesStatus() {
    const anecdotesData = useQuery({
      queryKey: ['anecdotes'],
      queryFn: getAll
    })

    const response = {
        data: [],
        errorContent: null
    }

    if (anecdotesData.isLoading)
      response.errorContent = 
        <div>
          loading data...
          {
            anecdotesData.failureCount > 0 &&
            <span> Failed, retrying.. attemp {anecdotesData.failureCount}</span>
          }
        </div>
      
    
    else if (!anecdotesData.isSuccess)
        response.errorContent = <div>anecdote service not available due to problems in server</div>
    else response.data = anecdotesData.data

    return response
}