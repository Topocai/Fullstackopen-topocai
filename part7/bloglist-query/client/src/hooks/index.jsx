import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'

import { useNotificationDispatch, setNotification } from './notification'
import { useAuthValue } from './userAuth'

export const useResource = (resourceKey, dependentKeys = []) => {
  const queryClient = useQueryClient()
  const { token } = useAuthValue()

  const apiUrl = `/api/${resourceKey}`

  const headers = {
    Authorization: `Bearer ${token || ''}`,
  }

  const queryConfig = {
    queryKey: [resourceKey],
    queryFn: () => axios.get(apiUrl, { headers }).then(({ data }) => data),
  }

  const queryData = useQuery(queryConfig)

  const resources = {
    data: queryData.isSuccess ? queryData.data : [],
    errorContent: queryData.isLoading ? (
      <>
        loading data...
        {queryData.failureCount > 0 && (
          <span>Failed, retrying.. attemp {queryData.failureCount}</span>
        )}
      </>
    ) : (
      queryData.isError && (
        <div>{resourceKey} service not available due to problems in server</div>
      )
    ),
  }

  const onSuccessHandler = (callback = () => {}) => {
    queryClient.invalidateQueries({ queryKey: [resourceKey] })
    queryClient.invalidateQueries({ queryKey: dependentKeys })
    callback()
  }

  const mutationConfig = {
    mutationFn: (newObject) =>
      axios.post(apiUrl, newObject, { headers }).then(({ data }) => data),
  }

  const newDataMutation = useMutation(mutationConfig)

  const updateMutationConfig = {
    mutationFn: (updatedObject) =>
      axios
        .put(`${apiUrl}/${updatedObject.id}`, updatedObject, { headers })
        .then(({ data }) => data),
  }

  const updateDataMutation = useMutation(updateMutationConfig)

  const removeMutationConfig = {
    mutationFn: (id) => axios.delete(`${apiUrl}/${id}`, { headers }),
  }

  const removeDataMutation = useMutation(removeMutationConfig)

  const services = {
    newDataMutation,
    updateDataMutation,
    removeDataMutation,
    onSuccessHandler,
  }

  return [resources, services]
}

export const useBlogs = () => {
  const [blogResource, blogservices] = useResource('blogs', ['users'])
  const notifyDispatch = useNotificationDispatch()

  const postCommentConfig = {
    mutationFn: ({ comment, blogId }) =>
      axios
        .post(`/api/blogs/${blogId}/comments`, { comment })
        .then(({ data }) => data),
  }
  const postCommentMutation = useMutation(postCommentConfig)

  const onAddBlogHandler = (e, blog) => {
    e.preventDefault()
    blogservices.newDataMutation.mutate(blog, {
      onSuccess: () =>
        blogservices.onSuccessHandler(
          notifyDispatch(
            setNotification(`Blog ${blog.title} added!`, 'green', 5),
          ),
        ),
      onError: (error) =>
        notifyDispatch(
          setNotification(
            `Blog '${blog.title} not added! try again\n${error.response.data.error}`,
            'red',
            5,
          ),
        ),
    })
  }

  const onVoteHandler = (e, blog) => {
    e.preventDefault()
    const newBlog = { ...blog, likes: blog.likes + 1 }
    blogservices.updateDataMutation.mutate(newBlog, {
      onSuccess: () =>
        blogservices.onSuccessHandler(
          notifyDispatch(
            setNotification(`Blog '${blog.title} voted!`, 'green', 5),
          ),
        ),
      onError: (error) =>
        notifyDispatch(
          setNotification(
            `Blog '${blog.title} not voted! try again\n${error.response.data.error}`,
            'red',
            5,
          ),
        ),
    })
  }

  const onRemoveHandler = (e, blogId) => {
    e.preventDefault()
    blogservices.removeDataMutation.mutate(blogId, {
      onSuccess: () =>
        blogservices.onSuccessHandler(
          notifyDispatch(setNotification(`Blog ${blogId} removed`, 'green', 5)),
        ),
      onError: (err) =>
        notifyDispatch(
          setNotification(
            `Error on remove ${err.response.data.error}`,
            'red',
            5,
          ),
        ),
    })
  }

  const onCommentHandler = (e, blogId, comment) => {
    e.preventDefault()

    postCommentMutation.mutate(
      { comment, blogId },
      {
        onSuccess: () =>
          blogservices.onSuccessHandler(
            notifyDispatch(
              setNotification(`Comment ${comment} added!`, 'green', 5),
            ),
          ),
        onError: (error) =>
          notifyDispatch(
            setNotification(
              `Comment not added: \n${error.response.data.error}`,
              'red',
              5,
            ),
          ),
      },
    )
  }

  const services = {
    onAddBlogHandler,
    onVoteHandler,
    onRemoveHandler,
    onCommentHandler,
  }

  return [blogResource, services]
}
