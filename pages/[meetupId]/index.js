import { Fragment } from "react";
import Head from "next/head";
import { MongoClient, ObjectId } from "mongodb";
import MeetupDetail from "../../components/meetups/MeetupDetail";

function MeetupDetails(props) {
  return (
    <Fragment>
      <Head>
        <title> {props.title} |Meetup Space</title>
        <meta
          name="description"
          content="Browser a huge list of highly active Next Meetup Space"
        />
      </Head>
      <MeetupDetail
        image={props.image}
        title={props.title}
        address={props.address}
        description={props.description}
      />
    </Fragment>
  );
}

export async function getStaticPaths() {
  const client = await MongoClient.connect(
    "mongodb+srv://root:root@cluster0.dzg4a.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupCollection = db.collection("meetups");
  const meetups = await meetupCollection.find({}, { _id: 1 }).toArray();
  client.close();
  return {
    fallback: 'blocking',
    paths: meetups.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),
  };
}

export async function getStaticProps(context) {
  const meetupId = context.params.meetupId;
  console.log(meetupId);
  const client = await MongoClient.connect(
    "mongodb+srv://root:root@cluster0.dzg4a.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupCollection = db.collection("meetups");
  const meetup = await meetupCollection.findOne({ _id: ObjectId(meetupId) });
  console.log(meetup);
  client.close();
  // send a http request and fetch data
  return {
    props: {
      image: meetup.image,
      title: meetup.title,
      address: meetup.address,
      description: meetup.description,
    },
    revalidate: 1,
  };
}

export default MeetupDetails;
