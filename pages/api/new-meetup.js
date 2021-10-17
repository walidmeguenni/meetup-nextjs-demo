// /api/new--meetup
// POST  /api/new-meetup
import { MongoClient } from "mongodb";

async function handler(req, res) {
  if (req.method === "POST") {
    const data = JSON.parse(req.body);
    console.log(JSON.parse(req.body));
    const client = await MongoClient.connect(
      "mongodb+srv://root:root@cluster0.dzg4a.mongodb.net/meetups?retryWrites=true&w=majority"
    );
    const db = client.db();
    const meetupCollection = db.collection("meetups");
    const result = await meetupCollection.insertOne(data);
    console.log(result);
    client.close();
    return res.status(201).json({ message: "Meetup inserted!" });
  }
}
export default handler;
