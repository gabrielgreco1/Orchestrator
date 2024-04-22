import app from './app.js'
const port = 5000

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });


// HANDLER GERAL
app.all('*', (req, res, next) => {
  res.status(404).json({
    status: 'fail',
    message: `Não foi possível encontrar a automação ${req.originalUrl.replace('/automation/', '')} on this server`
  })
})