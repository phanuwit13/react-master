import { logger } from '@/store/log'
import { create } from 'zustand'

type MessageInfo = 'info' | 'success' | 'error' | 'warning'

type dataInfo = {
  message: string
  type: MessageInfo
  isShow: boolean
  btnLabel?: string
  callback?: () => void
}

type MessageModal = {
  message: string
  type: 'info' | 'success' | 'error' | 'warning'
  isShow: boolean
  setInfo: (value: dataInfo) => void
  onClose: () => void
  btnLabel?: string
  callback?: () => void
}

const initialState: dataInfo = {
  message: '',
  type: 'info',
  isShow: false,
  btnLabel: 'Close',
}

export const useMessageModal = create<MessageModal>()(
  logger(
    (set) => ({
      ...initialState,
      setInfo: ({ isShow, message, type, btnLabel = 'Close', callback }) => {
        set({ isShow, message, type, btnLabel, callback: callback })
      },
      onClose: () => {
        set({ isShow: false })
      },
    }),
    'message-modal'
  )
)
