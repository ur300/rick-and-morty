import { type ReactElement } from "react";
import { type RenderOptions, render } from "@testing-library/react";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { QueryClient } from "@tanstack/react-query";
import { routeTree } from "../routeTree.gen";

const queryClient = new QueryClient();
const testRouter = createRouter({
  routeTree,
  context: { queryClient },
});

const AllTheProviders = () => {
  return <RouterProvider router={testRouter} />;
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">,
) => render(ui, { wrapper: AllTheProviders, ...options });

export const mockCharacter = {
  id: 1,
  name: "Rick Sanchez",
  status: "Alive" as const,
  species: "Human",
  type: "Genius",
  gender: "Male" as const,
  origin: {
    name: "Earth (C-137)",
    url: "https://rickandmortyapi.com/api/location/1",
  },
  location: {
    name: "Earth (Replacement Dimension)",
    url: "https://rickandmortyapi.com/api/location/20",
  },
  image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
  episode: [
    "https://rickandmortyapi.com/api/episode/1",
    "https://rickandmortyapi.com/api/episode/2",
  ],
  url: "https://rickandmortyapi.com/api/character/1",
  created: "2017-11-04T18:48:46.250Z",
};

export const mockDeadCharacter = {
  ...mockCharacter,
  id: 2,
  name: "Morty Smith",
  status: "Dead" as const,
  type: "",
  episode: [],
};

export const mockUnknownCharacter = {
  ...mockCharacter,
  id: 3,
  name: "Unknown Character",
  status: "unknown" as const,
  type: "",
  origin: {
    name: "Unknown",
    url: "",
  },
  location: {
    name: "Unknown",
    url: "",
  },
};

export * from "@testing-library/react";
export { customRender as render };
