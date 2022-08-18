import type { Message } from './Chat'

import { useEffect, useRef } from 'react'
import io from 'socket.io-client'

import { Chat, ChatRef } from './Chat'

export const socket = io()

export function App() {
  /* Chat */
  const chatRef = useRef<ChatRef>(null)

  /* Socket communication */
  useEffect(() => {
    socket.on('answer_message', (message: Message) =>
      chatRef.current?.send(message)
    )

    return () => {
      socket.off('answer_message')
    }
  }, [])

  return (
    <>
      <Chat
        ref={chatRef}
        onSend={(command) => socket.emit('ask_message', command)}
      />
    </>
  )
}
