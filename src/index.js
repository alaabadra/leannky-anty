const app = require('./app');

app.listen(app.get('port'), () => console.log(`Server is runnig on port:${app.get('port')}`));
