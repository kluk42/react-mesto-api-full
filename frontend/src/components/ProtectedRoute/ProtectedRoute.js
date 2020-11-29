import React from 'react';
import { Route, Redirect } from "react-router-dom";

function ProtectedRoute ({ loggedIn, ...routerProps  }) {
    return (
        loggedIn ? <Route {...routerProps} /> : <Redirect to="./sign-up" />
    )
};

export default ProtectedRoute