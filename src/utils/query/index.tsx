import { QueryClient } from "@tanstack/react-query";
import { QueryClientProvider } from "@tanstack/react-query";

type QueryClientBaseProps = {
  children: React.ReactNode;
}

export function QueryClientBase({ children }: QueryClientBaseProps) {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}