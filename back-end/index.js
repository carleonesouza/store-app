const app = require('./src/api/app');
const baseUtilite = require('./src/utilities/baseUtilite');


app.listen(baseUtilite.CONSTANTS.PORT, err => {
   if(err) {
       console.log('The connection cannot be established! ');
   }
   console.log('Connection was established!') 
});