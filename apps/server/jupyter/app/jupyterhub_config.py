# Configuration file for jupyterhub.

c = get_config()  #noqa

## Whether to shutdown the proxy when the Hub shuts down.
#  
c.JupyterHub.cleanup_proxy = False

## Whether to shutdown single-user servers when the Hub shuts down.
#  
c.JupyterHub.cleanup_servers = False

## Maximum number of concurrent users that can be spawning at a time.
#  
c.JupyterHub.concurrent_spawn_limit = 100

c.JupyterHub.cookie_secret_file = 'jupyterhub_cookie_secret'

c.JupyterHub.hub_ip = '127.0.0.1'

## The internal port for the Hub process.
#  
c.JupyterHub.hub_port = 8080

c.ConfigurableHTTPProxy.should_start = False
c.ConfigurableHTTPProxy.auth_token = "CONFIGPROXY_AUTH_TOKEN"
c.ConfigurableHTTPProxy.api_url = 'http://localhost:8001'

## Oauth
#
c.JupyterHub.authenticator_class = "generic"

Api_url = ''

c.GenericOAuthenticator.oauth_callback_url = 'https://{host}/hub/oauth_callback'
c.GenericOAuthenticator.client_id = 'OAUTH-CLIENT-ID'
c.GenericOAuthenticator.client_secret = 'OAUTH-CLIENT-SECRET-KEY'
c.GenericOAuthenticator.login_service = 'FWR'
c.GenericOauthenticator.authorize_url = f'{Api_url}/oauth/authorize'
c.GenericOAuthenticator.token_url = f'{Api_url}/oauth/token'
c.GenericOAuthenticator.userdata_url = f'{Api_url}/oauth/userinfo'
