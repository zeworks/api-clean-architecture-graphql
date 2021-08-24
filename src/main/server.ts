import 'dotenv/config'
import 'module-alias/register'
import app from './config/app'

app.listen(process.env.PORT, () => console.log(`Server is running at port ${process.env.PORT}`))
