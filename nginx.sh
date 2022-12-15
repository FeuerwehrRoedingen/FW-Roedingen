#!/bin/bash

sudo cp nginx.conf /etc/nginx/nginx.conf

sudo cp .cert/api.feuerwehr-roedingen.de.key /etc/nginx/api.feuerwehr-roedingen.de.key
sudo cp .cert/api.feuerwehr-roedingen.de.pem /etc/nginx/api.feuerwehr-roedingen.de.pem

sudo cp .cert/internal.feuerwehr-roedingen.de.key /etc/nginx/internal.feuerwehr-roedingen.de.key
sudo cp .cert/internal.feuerwehr-roedingen.de.pem /etc/nginx/internal.feuerwehr-roedingen.de.pem

sudo service nginx reload
