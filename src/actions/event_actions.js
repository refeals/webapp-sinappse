import { GET_EVENT } from "../actions/action_types"
import { api } from "../api"
import { getToken } from "../api/auth"

export const getEvent = (slug, { onSuccess, onError, onNetWorkError }) => (
  dispatch
) => {
  api
    .get(`/act.php?action=v2/webapp-event&slug=${slug}`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
    .then((response) => {
      if (response.data.success && response.data.data.id)
        dispatch({ type: GET_EVENT, payload: response.data.data })
      else {
        onError && onError(response.data.msg)
      }
    })
    .then(() => onSuccess && onSuccess())
    .catch((err) => onNetWorkError && onNetWorkError(err))
}
