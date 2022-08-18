import React, { useState } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'

import './ChatInput.scss'

export const ChatInput = ({ onSubmit }: { onSubmit: (s: string) => void }) => {
  const [message, setMessage] = useState('')

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault()
    onSubmit(message)
    setMessage('')
  }

  return (
    <form className="field" onSubmit={handleSubmit} id="chat-input">
      <div className="control has-icons-right">
        <input
          id="chat-input-field"
          className="input is-shadowless"
          type="text"
          name="input"
          autoComplete="off"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
        />
        <span className="icon is-right">
          <FontAwesomeIcon
            id="chat-input-submit"
            onClick={handleSubmit}
            icon={faPaperPlane}
            size="lg"
          />
        </span>
      </div>
    </form>
  )
}
