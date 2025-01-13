import { connectToDB } from "@/app/lib/data";

export default async function BlogPosts() {
  const client = await connectToDB();
  // console.log(client);

  return (
    <>
      { client && <p>Connected to the database</p> }
      <h1>Blog</h1>
    </>
  );
}
