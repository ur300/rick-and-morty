import { createFileRoute } from "@tanstack/react-router";
import charactersService from "@/services/characters.service";
import {
  Breadcrumbs,
  CharacterDetail,
  ErrorComponent,
  LoadingIndicator,
} from "@/components";

export const Route = createFileRoute("/characters/$characterId")({
  loader: async ({ params: { characterId } }) => {
    const response = await charactersService.getCharacter(Number(characterId));
    return {
      character: response.data,
    };
  },
  pendingComponent: () => (
    <LoadingIndicator message="Loading character details..." />
  ),
  component: CharacterDetailComponent,
  errorComponent: ({ error }) => (
    <ErrorComponent
      error={error}
      message="Failed to load character details. Please try again."
    />
  ),
});

function CharacterDetailComponent() {
  const { character } = Route.useLoaderData();

  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Characters", href: "/characters" },
          { label: character.name, current: true },
        ]}
      />
      <CharacterDetail character={character} />
    </>
  );
}
