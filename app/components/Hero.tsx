import Link from "next/link";

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
          className="border-4 border-[--pprl] w-full sm:w-64 p-2 rounded text-white font-semibold text-[1.2rem]"
        >
          <Link href="/quoties">Explore Now</Link>
        </button>
      </div>
      <div className="aspect-video p-2 border-4 rounded border-[--pprl]">
        <video
          className="rounded"
          muted
          src="https://cdnl.iconscout.com/lottie/premium/thumb/freelance-writer-typing-on-laptop-10237924-8329529.mp4"
          autoPlay
          loop
        />
      </div>
    </section>
  );
}
