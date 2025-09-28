import { Outlet, createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import {
  CharacterFilters,
  CharactersTable,
  ErrorComponent,
  LoadingIndicator,
  Pagination,
  RefreshButton,
} from "@/components";
import { charactersQueryOptions } from "@/queries";
import { type CharacterStatus } from "@/types";
import { validateCharacterSearch } from "@/helpers";

const PAGE_SIZE = 20;

export const Route = createFileRoute("/characters/")({
  component: CharactersIndexComponent,
  pendingComponent: () => (
    <LoadingIndicator message="Loading characters list..." />
  ),
  errorComponent: ({ error }) => (
    <ErrorComponent
      error={error}
      message="Failed to load characters. Please try again."
    />
  ),
});

function CharactersIndexComponent() {
  const navigate = Route.useNavigate();
  const search = Route.useSearch();
  const { page = 1, name, status } = validateCharacterSearch(search);

  const handleNameChange = (newName: string | undefined) => {
    navigate({
      search: {
        page: 1,
        name: newName,
        status,
      },
    });
  };

  const handleStatusChange = (newStatus: CharacterStatus | undefined) => {
    navigate({
      search: {
        page: 1,
        name,
        status: newStatus,
      },
    });
  };

  const handleClearFilters = () => {
    navigate({
      search: {
        page: 1,
        name: undefined,
        status: undefined,
      },
    });
  };

  const handlePageChange = (page: number) => {
    navigate({
      search: {
        page,
        name,
        status,
      },
    });
  };

  const {
    data: characters,
    refetch,
    isFetching,
  } = useSuspenseQuery(
    charactersQueryOptions({
      page,
      filter: {
        name,
        status,
      },
    }),
  );
  const handleRefresh = () => {
    refetch();
  };

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Rick and Morty Characters</h1>
        <RefreshButton onRefresh={handleRefresh} isFetching={isFetching} />
      </div>

      <CharacterFilters
        name={name}
        status={status}
        onNameChange={handleNameChange}
        onStatusChange={handleStatusChange}
        onClearFilters={handleClearFilters}
      />

      <CharactersTable characters={characters.results} />
      <Pagination
        currentPage={page}
        totalPages={characters.info.pages}
        pageSize={PAGE_SIZE}
        showPageInfo={true}
        onPageChange={handlePageChange}
      />
      <Outlet />
    </>
  );
}
