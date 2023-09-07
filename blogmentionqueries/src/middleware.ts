import { AnyAction, Middleware, MiddlewareAPI, isRejected, isRejectedWithValue } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import { isEntityError } from 'utils/helper'

export function isPayloadErrorMessage(payload: unknown): payload is {
  data: {
    error: string
  }
  status: number
} {
  return (
    typeof payload === 'object' &&
    payload !== null &&
    'data' in payload &&
    typeof (payload as any).data.error === 'string'
  )
}
export const RTKQueryErrorLogger: Middleware = (api: MiddlewareAPI) => (next) => (action: AnyAction) => {
  if (isRejected(action)) {
    if (action.error.name === 'CustomError') {
      toast.warn(action.error.message)
    }
  }
  if (isRejectedWithValue(action)) {
    if (isPayloadErrorMessage(action.payload)) {
      toast.warn(action.payload.data.error)
    } else if (!isEntityError(action.payload)) {
      toast.warn(action.error.message)
    }
  }
  next(action)
}
