import type { ForwardedRef } from 'react'
import type { Message } from './types'

import React, { useEffect, useRef, useState, useImperativeHandle } from 'react'

import { Message as ChatMessage } from './Message'
import { ChatInput } from './ChatInput'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDoubleDown } from '@fortawesome/free-solid-svg-icons'
import './Chat.scss'

export type ChatRef = {
  send: (message: Message) => void
}

function Chat(
  {
    initialLimit = 20,
    onSend = () => {},
  }: {
    initialLimit?: number
    onSend?: (message: string) => void
  },
  ref: ForwardedRef<ChatRef>
) {
  const [history, setHistory] = useState([] as Message[])

  /* Imperative handler logic */
  useImperativeHandle(
    ref,
    () =>
      ({
        send: (message: Message) => {
          setHistory((history) => [...history, message])
        },
      } as ChatRef)
  )

  /* Scroll logic */
  const [bottom, setBottom] = useState(true)
  const [limit, setLimit] = useState(initialLimit)
  const messagesEnd: React.Ref<HTMLDivElement> = useRef(null)

  const handleLoadMore = () => {
    setLimit((limit) => limit + initialLimit)
  }

  const handleScroll = (
    event: React.UIEvent<HTMLDivElement> & { target: HTMLDivElement }
  ) => {
    const currentHeight = event.target.scrollHeight - event.target.scrollTop
    const isBottom = currentHeight - event.target.clientHeight < 50

    setBottom(isBottom)
    setLimit((limit) => (isBottom ? initialLimit : limit))
  }

  const scrollToBottom = () => {
    messagesEnd.current?.scrollIntoView({ behavior: 'smooth' })
  }
  useEffect(scrollToBottom, [history])

  /* Render */
  return (
    <div id="root">
      <section className="hero is-fullhd">
        <div className="box" id="chat-messages" onScroll={handleScroll}>
          <div className="chat-messages-content">
            <div className="columns is-1 is-mobile" />
            {limit < history.length && (
              <button className="load-more" onClick={handleLoadMore}>
                Load more!
              </button>
            )}
            {history.slice(-limit).map((m) => (
              <ChatMessage {...m} key={m.id} />
            ))}
            <div ref={messagesEnd} />
          </div>

          {!bottom && (
            <div id="scroll-bottom" onClick={scrollToBottom}>
              <FontAwesomeIcon icon={faAngleDoubleDown} />
            </div>
          )}
        </div>
        <div className="static">
          <ChatInput onSubmit={onSend} />
        </div>
      </section>
    </div>
  )
}

const Chat_ = React.forwardRef(Chat)
export { Chat_ as Chat }
