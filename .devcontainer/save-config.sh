#!/usr/bin/env bash
set -e

# Switch to the .devcontainer folder
cd "$( dirname "${BASH_SOURCE[0]}" )"

# Create a temporary directory
mkdir -p openvpn-tmp
cd openvpn-tmp

# Save the secrets into files
if [ ! -z "${OPENVPN_CONFIG}" ]; then 
    echo "${OPENVPN_CONFIG}" > vpnconfig.ovpn
fi
if [ ! -z "${OPENVPN_CREDENTIALS}" ]; then
    echo "${OPENVPN_CREDENTIALS}" > credentials.conf
fi