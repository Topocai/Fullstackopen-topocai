import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'

import { useNotificationDispatch, setNotification } from './notification'
import { useAuthValue } from './userAuth'

export const useResource = (key) => {
  const queryClient = useQueryClient()
  const userData = useAuthValue()
  const token = userData.token

  const baseUrl = `/api/${key}`

  const config = {
    headers: { Authorization: `bearer ${token ? token : ''}` },
  }

  const queryData = useQuery({
    queryKey: [key],
    queryFn: () => axios.get(baseUrl).then((res) => res.data),
  })

  const resources = {
    data: [],
    errorContent: null,
  }

  if (queryData.isLoading)
    resources.errorContent = (
      <div>
        loading data...
        {queryData.failureCount > 0 && (
          <span> Failed, retrying.. attemp {queryData.failureCount}</span>
        )}
      </div>
    )
  else if (!queryData.isSuccess)
    resources.errorContent = (
      <div>'{key}' Service not available due to problems in server</div>
    )
  else resources.data = queryData.data

  const onSuccesHandler = (callback = () => {}) => {
    queryClient.invalidateQueries({ queryKey: [key] })
    callback()
  }

  const newDataMutation = useMutation({
    mutationFn: (newObject) =>
      axios.post(baseUrl, newObject, config).then((res) => res.data),
  })

  const updateDataMutation = useMutation({
    mutationFn: (newObject) =>
      axios.put(`${baseUrl}/${newObject.id}`, newObject, config),
  })

  const removeDataMutation = useMutation({
    mutationFn: (id) => axios.delete(`${baseUrl}/${id}`, config),
  })

  const mutations = {
    newDataMutation,
    updateDataMutation,
    removeDataMutation,
    onSuccesHandler,
  }

  return [resources, mutations]
}

export const useBlogs = () => {
  const [blogResource, blogMutations] = useResource('blogs')
  const notifyDispatch = useNotificationDispatch()

  const onAddBlogHandler = (e, blog) => {
    e.preventDefault()
    blogMutations.newDataMutation.mutate(blog, {
      onSuccess: () =>
        blogMutations.onSuccesHandler(
          notifyDispatch(
            setNotification(`Blog ${blog.title} added!`, 'green', 5),
          ),
        ),
      onError: (error) =>
        notifyDispatch(
          setNotification(
            `Blog '${blog.title} not added! try again\n${error}`,
            'red',
            5,
          ),
        ),
    })
  }

  const onVoteHandler = (e, blog) => {
    e.preventDefault()
    const newBlog = { ...blog, likes: blog.likes + 1 }
    blogMutations.updateDataMutation.mutate(newBlog, {
      onSuccess: () =>
        blogMutations.onSuccesHandler(
          notifyDispatch(
            setNotification(`Blog '${blog.title} voted!`, 'green', 5),
          ),
        ),
      onError: (error) =>
        notifyDispatch(
          setNotification(
            `Blog '${blog.title} not voted! try again\n${error}`,
            'red',
            5,
          ),
        ),
    })
  }

  const onRemoveHandler = (e, blogId) => {
    e.preventDefault()
    blogMutations.removeDataMutation.mutate(blogId, {
      onSuccess: () =>
        blogMutations.onSuccesHandler(
          notifyDispatch(setNotification(`Blog ${blogId} removed`, 'green', 5)),
        ),
      onError: (err) =>
        notifyDispatch(setNotification(`Error on remove ${err}`, 'red', 5)),
    })
  }

  const mutations = {
    onAddBlogHandler,
    onVoteHandler,
    onRemoveHandler,
    updateToken: blogMutations.updateToken,
  }

  return [blogResource, mutations]
}
