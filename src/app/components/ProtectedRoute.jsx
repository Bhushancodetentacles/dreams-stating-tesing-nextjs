"use client";

import { useDynamicContext } from "@dynamic-labs/sdk-react-core";

export default function ProtectedRoute({ children }) {
  const { authToken } = useDynamicContext();
  if (!authToken) return null;
  return <>{children}</>;
}
