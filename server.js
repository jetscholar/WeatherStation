if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const port = 6900
const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const app = express()
const { fetch } = require('undici')

async function fetchData() {
    const res = await fetch('http://192.168.1.202')
    const txt = await res.json()
    console.log(txt)
}

fetchData()

// set and use things
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))
app.use(express.json({ limit: '1mb' }))

// Routes
const indexRouter = require('./routes/index')

app.use('/', indexRouter)

app.listen(process.env.PORT || port, () => {
    console.log('Web App ready at http://localhost:' + port)
})