export const serverUrl = import.meta.env.VITE_API_BASE_URL || ""

export async function signUpApi({ name, userName, email, password }) {
  const res = await fetch(`${serverUrl}/api/auth/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ name, userName, email, password }),
  })
  if (!res.ok) { try { const e = await res.json(); throw new Error(e.message || 'Signup failed') } catch { throw new Error((await res.text()) || 'Signup failed') } }
  return res.json()
}

export async function signInApi({ userName, password }) {
  const res = await fetch(`${serverUrl}/api/auth/signin`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ userName, password }),
  })
  if (!res.ok) { try { const e = await res.json(); throw new Error(e.message || 'Signin failed') } catch { throw new Error((await res.text()) || 'Signin failed') } }
  return res.json()
}

export async function signOutApi() {
  await fetch(`${serverUrl}/api/auth/signout`, { credentials: 'include' })
}

export async function getPostsApi() {
  const res = await fetch(`${serverUrl}/api/post/getAll`, { credentials: 'include' })
  if (!res.ok) { try { const e = await res.json(); throw new Error(e.message || 'Failed to fetch posts') } catch { throw new Error((await res.text()) || 'Failed to fetch posts') } }
  return res.json()
}

export async function uploadPostApi({ file, caption }) {
  const formData = new FormData()
  formData.append('media', file)
  if (caption) formData.append('caption', caption)
  const res = await fetch(`${serverUrl}/api/post/upload`, {
    method: 'POST',
    credentials: 'include',
    body: formData,
  })
  if (!res.ok) { try { const e = await res.json(); throw new Error(e.message || 'Upload failed') } catch { throw new Error((await res.text()) || 'Upload failed') } }
  return res.json()
}

export async function likePostApi(postId) {
  const res = await fetch(`${serverUrl}/api/post/like/${postId}`, { credentials: 'include' })
  if (!res.ok) { try { const e = await res.json(); throw new Error(e.message || 'Failed to like post') } catch { throw new Error((await res.text()) || 'Failed to like post') } }
  return res.json()
}

export async function updatePostApi(postId, { file, caption }) {
  const formData = new FormData()
  if (file) formData.append('media', file)
  if (typeof caption === 'string') formData.append('caption', caption)
  const res = await fetch(`${serverUrl}/api/post/${postId}`, {
    method: 'PUT',
    credentials: 'include',
    body: formData,
  })
  if (!res.ok) { try { const e = await res.json(); throw new Error(e.message || 'Update failed') } catch { throw new Error((await res.text()) || 'Update failed') } }
  return res.json()
}

export async function deletePostApi(postId) {
  const res = await fetch(`${serverUrl}/api/post/${postId}`, {
    method: 'DELETE',
    credentials: 'include',
  })
  if (!res.ok) { try { const e = await res.json(); throw new Error(e.message || 'Delete failed') } catch { throw new Error((await res.text()) || 'Delete failed') } }
  return res.json()
}

export async function addCommentApi(postId, message) {
  const res = await fetch(`${serverUrl}/api/post/${postId}/comment`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ message }),
  })
  if (!res.ok) { try { const e = await res.json(); throw new Error(e.message || 'Add comment failed') } catch { throw new Error((await res.text()) || 'Add comment failed') } }
  return res.json()
}

export async function updateCommentApi(postId, commentId, message) {
  const res = await fetch(`${serverUrl}/api/post/${postId}/comment/${commentId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ message }),
  })
  if (!res.ok) { try { const e = await res.json(); throw new Error(e.message || 'Update comment failed') } catch { throw new Error((await res.text()) || 'Update comment failed') } }
  return res.json()
}

export async function deleteCommentApi(postId, commentId) {
  const res = await fetch(`${serverUrl}/api/post/${postId}/comment/${commentId}`, {
    method: 'DELETE',
    credentials: 'include',
  })
  if (!res.ok) { try { const e = await res.json(); throw new Error(e.message || 'Delete comment failed') } catch { throw new Error((await res.text()) || 'Delete comment failed') } }
  return res.json()
}
