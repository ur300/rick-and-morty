import { Link } from "@tanstack/react-router";

export const Header = () => {
  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <nav
        aria-label="Global"
        className="flex items-center justify-between px-20 py-6"
      >
        <div className="flex lg:flex-1">
          <Link to="/" className="-m-1.5 p-1.5">
            <span className="sr-only">
              Rick and Morty Characters application
            </span>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Rick_and_Morty.svg/1600px-Rick_and_Morty.svg.png?20220319060844"
              alt="Rick and Morty logo"
              className="h-8 w-auto"
            />
          </Link>
        </div>
      </nav>
    </header>
  );
};
