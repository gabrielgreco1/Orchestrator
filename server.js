import app from './app/app.js'
const port = 5000

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });

// HANDLER DE ROTAS GERAL
app.all('*', (req, res, next) => {
  let automation = req.originalUrl.replace('/automation/', '').split('?')
  res.status(404).json({
    status: 'fail',
    message: `Não foi possível encontrar a automação ${automation[0]} neste server`
  })
  next()
})