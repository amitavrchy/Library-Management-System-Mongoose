import { Server } from 'http'
import app from './app';
let server: Server;
const PORT = 5000;
async function main() {
  try{
    server = app.listen(PORT, () => {
      console.log(`App is running on port ${PORT}`);
    })
  }
  catch(err){

  }
}
main();