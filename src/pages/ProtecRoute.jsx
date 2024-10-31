import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import PropTypes from "prop-types";

const ProtectedRoute =   ({ adminElement, employeElement }) => {

    const { token, role } =  useSelector((state) => state.auth);
    const isAuthenticated = !!token;

  if ( !isAuthenticated) {
        return <Navigate to="/" />;
    }

    if (role === 'admin') {
        return adminElement
    } else if (role === 'employe') {
        return employeElement;
    } else {
        return <Navigate to="/unauthorized" />;
    }
};
ProtectedRoute.propTypes = {
    adminElement: PropTypes.element.isRequired,
    employeElement: PropTypes.element.isRequired,
};

export default ProtectedRoute;
