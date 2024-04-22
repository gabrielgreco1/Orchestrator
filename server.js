import app from './app/app.js'
const port = 5000

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });

// app.get('/automation/linkedin_scrapper', (req, res, next) => {
//   id = write_start("Linkedin scrapper");
//   next()
// })

// HANDLER GERAL
app.all('*', (req, res, next) => {
  res.status(404).json({
    status: 'fail',
    message: `Não foi possível encontrar a automação ${req.originalUrl.replace('/automation/', '')} on this server`
  })
})