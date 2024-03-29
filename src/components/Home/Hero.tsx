import { Link } from "react-router-dom";

/* eslint-disable @typescript-eslint/ban-ts-comment */
export default function Hero() {
  return (
    <section className="flex flex-wrap lg:flex-nowrap items-center justify-between gap-14">
      <div className="flex flex-col gap-5">
        <h1 className="text-[2rem] text-center md:text-left">
          Quotie
          <span className="textPurple border-b-2 border-[--my-blue]">
            {" "}
            Pockets!
          </span>
        </h1>
        <p className="text-justify text-[1.2rem]">
          A platform where you can easily create and share your importanct
          lecture notes or the quotes.
        </p>
        <button
          type="button"
          className="bgPurple hover:bg-purple-500 w-full sm:w-64 p-2 rounded text-white font-semibold text-[1.2rem]"
        >
          <Link to="/quotie">Explore Now</Link>
        </button>
      </div>
      <div className="aspect-video p-2 border-4 rounded border-[#cb57f7]">
        <video
          className="rounded"
          loading="lazy"
          // @ts-expect-error
          muted="muted"
          src="https://cdnl.iconscout.com/lottie/premium/thumb/freelance-writer-typing-on-laptop-10237924-8329529.mp4"
          type="video/mp4"
          autoplay="autoplay"
          // @ts-expect-error
          loop="loop"
        />
      </div>
    </section>
  );
}
