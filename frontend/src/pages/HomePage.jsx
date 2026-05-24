import phm from "../assets/phm.webp";

export default function HomePage() {
  return (
    <div className="bg-beige-200 font-['Inter']">
      <section className="min-h-screen grid lg:grid-cols-2 grid-cols-1 items-center justify-items-center gap-12 px-8">
        <div className="space-y-6 text-center max-w-l">
          <h1 className="text-6xl font-semi-bold">CineLog</h1>
          <p className="max-w-3xl text-lg text-wrap">
            Welcome to CineLog! To get started click the "Log In" button. If you
            are a new user, you will be able to easily create your new account.
            Once signed in, you can search for movies you have seen and add them
            to your "Watchlist". You will also be able to view your watchlist
            and update the status and ratings of any of the movies you have
            seen!
          </p>
          <button className="py-3 px-8 bg-maroon-500 hover:bg-maroon-200 text-white rounded-full transition">
            Log In
          </button>
        </div>
        <img
          src={phm}
          className="w-full max-w-2xl border-beige-500 border-8 rounded-2xl object-cover"
        />
      </section>
    </div>
  );
}
