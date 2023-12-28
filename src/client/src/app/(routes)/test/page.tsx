"use client";
import { useRouter } from "next/navigation";
import { RandomAuth } from "./auth";

export default function Index() {
  const router = useRouter();

  const handleSubmit = async (e : any) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const username = formData.get('username') as string;
    const password = formData.get('password') as string;

    try {
      const res = await RandomAuth({ username, password });
      if (res) {
          router.push('/new');
      }
    } catch (error) {
      console.error(error);
      router.push('/');
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} method="POST">
        <input type="text" name="username" placeholder="Enter your username" />
        <input type="password" name="password" placeholder="Enter your password" />
        <button type="submit">Submit</button>
      </form>
    </>
  );
}
