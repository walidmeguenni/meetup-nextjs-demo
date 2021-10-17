import { Fragment } from "react";
import Head from 'next/head'
import { MongoClient } from "mongodb";
import MeetupList from "../components/meetups/MeetupList";

const HomePage = (props) => {
  return (
    <Fragment>
      <Head>
        <title>Meetup Space | Home</title>
        <meta name="description" content="Browser a huge list of highly active Next Meetup Space" />
      </Head>
      <MeetupList meetups={props.meetups} />
    </Fragment>
  );
};

// export async function getServerSideProps(context) {
//   const req=context.req;
//   const res=context.res;
//   // send a http request and fetch data
//   return {
//     props: {
//       meetups: DYMMY_MEETUPS,
//     },
//   };
// }

export async function getStaticProps() {
  // send a http request and fetch data
  const client = await MongoClient.connect(
    "mongodb+srv://root:root@cluster0.dzg4a.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupCollection = db.collection("meetups");
  const meetups = await meetupCollection.find().toArray();
  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        image: meetup.image,
        address: meetup.address,
        description: meetup.description,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 1,
  };
}

export default HomePage;
