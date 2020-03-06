const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://bapib7:creative@cluster0-53wjh.mongodb.net/fasion-store?retryWrites=true&w=majority', {useNewUrlParser: true})
.then(()=>{console.log('Connected to Mongo DB');})
.catch((err)=>{console.error('Not connected to Mongo DB',err)})
exports.mongoose = mongoose;





