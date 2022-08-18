import React from 'react'
import ReactDOM from 'react-dom/client'

import Moment from 'moment'

import './main.scss'
import 'bulma/bulma.sass'

import { App } from './App'

/* Change moment time disaplay*/
Moment.locale('precise-en', {
  relativeTime: {
    future: 'in %s',
    past: '%s ago',
    s: '%d seconds',
    m: 'a minute',
    mm: '%d minutes',
    h: 'an hour',
    hh: '%d hours',
    d: 'a day',
    dd: '%d days',
    M: 'a month',
    MM: '%d months',
    y: 'a year',
    yy: '%d years',
  },
})

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
