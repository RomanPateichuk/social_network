import React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

export type UrlIdParams = {
  userId: string
}

export function withRouter(Component: React.ComponentType) {
  function ComponentWithRouterProp(props: any) {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams<UrlIdParams>();
    return (
      <Component
        {...props}
        location={location}
        params={params}
        navigate={navigate}
      />
    );
  }

  return ComponentWithRouterProp;
}