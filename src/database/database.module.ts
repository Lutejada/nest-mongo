import { Module, Global } from '@nestjs/common';
import { MongoClient } from 'mongodb';

const API_KEY = '12345634';
const API_KEY_PROD = 'PROD1212121SA';

  //const taskColection = database.collection('task');
  //const task = await taskColection.find().toArray();
  //console.log(task);


@Global()
@Module({
  providers: [
    {
      provide: 'API_KEY',
      useValue: process.env.NODE_ENV === 'prod' ? API_KEY_PROD : API_KEY,
    },
    {
      provide: 'MONGO',
      useFactory: async () => {
        const uri =
          'mongodb://localhost:27017';
        const client = new MongoClient(uri);
        await client.connect();
        const database = client.db('Platzi-store');
        return database;
     },
    },
  ],
  exports: ['API_KEY', 'MONGO'],
})
export class DatabaseModule {}
