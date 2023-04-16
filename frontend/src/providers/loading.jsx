import { createContext, useState } from 'react';

const loadingContext = createContext({ loading: false, setLoading: () => {} });

function LoadingProvider({ children }) {
  const [loading, setLoading] = useState(false);

  return (
    <LoadingProvider value={{ loading, setLoading }}>
      {children}
    </LoadingProvider>
  );
}

export { loadingContext, LoadingProvider };
