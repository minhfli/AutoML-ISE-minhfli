import Image from "next/image";
import Link from "next/link";
import logo from "@/public/logo.png";

export default function Home() {
    type message = {
        id: number;
        title: string;
        description: string;
        href: string;
    };

    const messages: message[] = [
        {
            id: 1,
            title: "Login",
            description:
                "Start creating your account and get started with the platform.",
            href: "/login",
        },
        {
            id: 2,
            title: "Learn",
            description: "Learn how we automate your ML Workflow for you!",
            href: "/login",
        },
        {
            id: 3,
            title: "Projects",
            description:
                "Explore what you can do with the platform with various task with NLP, Vision, Audio, Tabular and more!",
            href: "/project",
        },
        {
            id: 4,
            title: "Deploy",
            description:
                "Instantly deploy your model via an API, a Web App or even a huge pkt file directly from the cloud.",
            href: "/login",
        },
    ];
    /*
        # TODO: Khong code chay css nhu nay, thay = component lib.
    */
    const tempHref: string = "#";
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
                <button
                    className="btn btn-outline btn-accent fixed left-0 top-16 lg:top-0 flex w-full cursor-pointer justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl transition duration-300 ease-in-out hover:bg-gray-100 hover:text-gray-800 lg:static lg:w-auto lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:dark:bg-zinc-800/30">
                    Welcome to AutoML Platform
                    <code className="font-mono font-bold">proudly made by RD320 lab</code>
                </button>


                <div
                    className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white lg:static lg:h-auto lg:w-auto lg:bg-none dark:from-black dark:via-black">
                    <Link
                        className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
                        href={tempHref}
                        prefetch={true}
                        rel="noopener noreferrer"
                    >
                        By{" "}
                        <Image
                            src={logo}
                            alt="Huggingface Logo"
                            width={100}
                            height={96}
                            priority
                        />
                    </Link>
                </div>
            </div>

            <div
                className="mb-32 grid gap-4 text-center md:grid-cols-2 sm:grid-cols-1 lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left lg:gap-8 justify-between">
                {messages.map((message, index) => (
                    <Link
                        key={message.id}
                        href={message.href}
                        prefetch={true}
                        className="group rounded-lg border border-gray-400 px-5 mb-52 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30 "
                        rel="noopener noreferrer"
                    >
                        <h2 className={`mb-3 text-2xl font-semibold`}>
                            {message.title}{" "}
                            <span
                                className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                -&gt;
              </span>
                        </h2>
                        <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
                            {message.description}
                        </p>
                    </Link>
                ))}
            </div>
        </main>
    );
}
