const express = require('express')
const ejs = require('ejs')
const path = require('path/posix')
const PORT = process.env.PORT || 7007
const app = express()

app.engine( 'html', ejs.renderFile)
app.set('view engine', 'html')
app.use(express.static(path.join(process.cwd(), 'public')))

app.get('/', (req, res) => res.render('index'))
app.get('/login', (req, res) => res.render('login'))
app.get('/register', (req, res) => res.render('register'))

app.listen(PORT, () => console.log("Client server is running on http://localhost:" + PORT))