import * as React from "react";

interface ProtectedComponentProps {
  children?: React.ReactNode;
  notAuthenticated?: React.ReactNode;
  currentTime?: Number;
  expiresAt: Number;
}

const ProtectedComponent: React.FunctionComponent<ProtectedComponentProps> = (
  props: ProtectedComponentProps
) => {
  const currentTime: Number = props.currentTime
    ? props.currentTime
    : new Date().getTime();
  const isAuthenticated = currentTime < props.expiresAt;
  console.log("Authenticated: ", isAuthenticated);
  return <>{isAuthenticated ? props.children : props.notAuthenticated}</>;
};

export default ProtectedComponent;
