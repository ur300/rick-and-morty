import { useEffect, useRef, useState } from "react";
import { type CharacterStatus } from "@/types";
import { useDebounce } from "@/hooks/useDebounce";

type CharacterFiltersProps = {
  name: string | undefined;
  status: CharacterStatus | undefined;
  onNameChange: (name: string | undefined) => void;
  onStatusChange: (status: CharacterStatus | undefined) => void;
  onClearFilters: () => void;
};

export const CharacterFilters = ({
  name,
  status,
  onNameChange,
  onStatusChange,
  onClearFilters,
}: CharacterFiltersProps) => {
  const [localName, setLocalName] = useState(name || "");
  const debouncedName = useDebounce(localName, 500);
  const isClearingRef = useRef(false);

  useEffect(() => {
    if (!isClearingRef.current) {
      setLocalName(name || "");
    }
  }, [name]);

  useEffect(() => {
    if (isClearingRef.current) {
      return;
    }

    const normalizedDebouncedName = debouncedName || undefined;
    const normalizedName = name || undefined;

    if (normalizedDebouncedName !== normalizedName) {
      onNameChange(normalizedDebouncedName);
    }
  }, [debouncedName, name, onNameChange]);

  const handleNameChange = (value: string) => {
    setLocalName(value);
  };

  const handleStatusChange = (status: CharacterStatus | undefined) => {
    onStatusChange(status);
  };

  const handleClearFilters = () => {
    isClearingRef.current = true;
    setLocalName("");
    onClearFilters();
    setTimeout(() => {
      isClearingRef.current = false;
    }, 600);
  };

  return (
    <div className="mb-6 max-w-2xl ml-auto">
      <div className="flex flex-col flex-row gap-4 items-center">
        <div className="flex-1 min-w-0">
          <input
            id="name-filter"
            type="text"
            placeholder="Search by character name..."
            value={localName}
            onChange={(e) => handleNameChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div className="flex-1 min-w-0">
          <select
            id="status-filter"
            value={status || ""}
            onChange={(e) =>
              handleStatusChange(
                (e.target.value as CharacterStatus) || undefined,
              )
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All Statuses</option>
            <option value="Alive">Alive</option>
            <option value="Dead">Dead</option>
            <option value="unknown">Unknown</option>
          </select>
        </div>
        {(localName || status) && (
          <button
            onClick={handleClearFilters}
            className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 underline cursor-pointer"
          >
            Clear Filters
          </button>
        )}
      </div>
    </div>
  );
};
