import { Link } from "@tanstack/react-router";

type ErrorComponentProps = {
  error?: Error;
  message?: string;
};

export function ErrorComponent({ error, message }: ErrorComponentProps) {
  const errorMessage =
    error?.message || message || "The page you are looking for does not exist.";

  return (
    <div className="min-h-[400px] flex flex-col items-center justify-center text-center p-8">
      <div className="max-w-md">
        <p className="text-gray-600 mb-6">{errorMessage}</p>

        <div className="space-y-4">
          <Link
            to="/"
            className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 underline"
          >
            Go to Home page
          </Link>
        </div>
      </div>
    </div>
  );
}
