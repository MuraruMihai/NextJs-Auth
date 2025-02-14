import mongoose from 'mongoose';
import moongose from 'mongoose';

const dbConnect = async () => {
    if(moongose.connection.readyState >= 1){
        return;
    }

    mongoose.connect(process.env.DB_URI);
}

export default dbConnect;