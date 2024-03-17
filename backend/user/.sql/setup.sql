CREATE USER user_service WITH ENCRYPTED PASSWORD 'user_service_password';

CREATE DATABASE users WITH OWNER user_service;
