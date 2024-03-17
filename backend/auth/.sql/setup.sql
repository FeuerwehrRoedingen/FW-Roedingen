CREATE USER auth_service WITH ENCRYPTED PASSWORD 'auth_service_password';

CREATE DATABASE auth WITH OWNER auth_service;