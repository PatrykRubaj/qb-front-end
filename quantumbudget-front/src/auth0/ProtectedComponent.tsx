import React from 'react';

interface ProtectedComponentProps {
  children?: React.ReactNode;
  notAuthenticated?: React.ReactNode;
  currentTime?: number;
  expiresAt: number;
}

const ProtectedComponent: React.FunctionComponent<ProtectedComponentProps> = (
  props: ProtectedComponentProps
) => {
  const currentTime: Number = props.currentTime
    ? props.currentTime
    : new Date().getTime();
  const isAuthenticated = currentTime < props.expiresAt;
  return <>{isAuthenticated ? props.children : props.notAuthenticated}</>;
};

export default ProtectedComponent;
