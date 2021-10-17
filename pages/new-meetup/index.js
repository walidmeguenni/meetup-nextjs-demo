import { Fragment } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import NewMeetupForm from "../../components/meetups/NewMeetupForm";

//www.our-domian.com/new-meetup

const NewMeetup = () => {
  const router = useRouter();

  const addMeetupHandler = async (enterMeetupData) => {
    const response = await fetch("/api/new-meetup", {
      method: "POST",
      body: JSON.stringify(enterMeetupData),
      headers: {
        "Content-Type": "appliction/json",
      },
    });
    const data = await response.json();
    console.log(data);
    router.push("/");
  };
  return (
    <Fragment>
      <Head>
        <title> Post Meetup|Meetup Space</title>
        <meta
          name="description"
          content="Browser a huge list of highly active Next Meetup Space"
        />
      </Head>
      <NewMeetupForm onAddMeetup={addMeetupHandler} />
    </Fragment>
  );
};

export default NewMeetup;
