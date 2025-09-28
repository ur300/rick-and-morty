type RefreshButtonProps = {
  onRefresh: () => void;
  isFetching: boolean;
  className?: string;
};

export function RefreshButton({
  onRefresh,
  isFetching,
  className = "",
}: RefreshButtonProps) {
  return (
    <button
      onClick={onRefresh}
      disabled={isFetching}
      className={`
        flex items-center gap-2 rounded-lg transition-colors
        bg-gray-200 hover:bg-gray-300 py-2 px-4 cursor-pointer
        disabled:opacity-50 disabled:cursor-not-allowed
        ${className}
      `}
    >
      <svg
        className={`w-4 h-4 ${isFetching ? "animate-spin" : ""}`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
        />
      </svg>
      {isFetching ? "Refreshing..." : "Refresh"}
    </button>
  );
}
