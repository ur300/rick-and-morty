import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import type { QueryClient } from "@tanstack/react-query";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { TanstackDevtools } from "@tanstack/react-devtools";
import { ErrorComponent, Header } from "@/components";

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
}>()({
  component: RootComponent,
  notFoundComponent: () => <ErrorComponent message="Page not found" />,
});

function RootComponent() {
  return (
    <div className="p-20">
      <Header />
      <Outlet />
      <TanstackDevtools
        config={{
          position: "bottom-left",
        }}
        plugins={[
          {
            name: "Tanstack Router",
            render: <TanStackRouterDevtoolsPanel />,
          },
        ]}
      />
    </div>
  );
}
