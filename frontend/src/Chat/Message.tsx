import type { Message as MessageType } from './types'
import { useState } from 'react'
import Moment from 'moment'

import './Message.scss'
import { useInterval } from 'usehooks-ts'
import { socket } from '../App'

export const Message = ({ message, sender, dateSent }: MessageType) => {
  const [date, setDate] = useState('')
  useInterval(() => {
    setDate(Moment(dateSent).fromNow())
  }, 1000)

  return (
    <div
      className={sender == socket.id ? 'is-user is-self' : 'is-user is-others'}
    >
      <div className="columns is-1 is-mobile">
        <article className="column message is-narrow is-centered">
          <div className="message-body">{message}</div>
          <p className="help is-small">{date}</p>
        </article>
      </div>
    </div>
  )
}
