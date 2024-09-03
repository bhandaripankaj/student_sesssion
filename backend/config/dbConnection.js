import mongoose from 'mongoose';

 mongoose.connect(process.env.MONGO_URI,  {useNewUrlParser: true,useUnifiedTopology: true}).then(success => {
    console.log('MongoDb Connected...');
}).catch(err => {
    console.error('Not Connected To DataBase', err);
    process.exit(1);
});
