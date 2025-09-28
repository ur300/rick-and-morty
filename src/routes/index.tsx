import { Link, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <div className="p-8 min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-7xl">
          Rick and Morty Characters
        </h1>
        <p className="mt-8 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">
          🚀 Dive into the multiverse and discover characters from Rick and
          Morty!
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link
            to="/characters"
            className="inline-block bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Explore Characters!
          </Link>
        </div>
      </div>
    </div>
  );
}
