import auth0, { WebAuth } from 'auth0-js';
import { NextRouter } from 'next/router';
import { Route, User } from '../redux/state';

export default class Auth {
  private history: NextRouter;
  private auth0: WebAuth;

  constructor(history: NextRouter) {
    this.history = history;
    this.auth0 = new auth0.WebAuth({
      domain: process.env.NEXT_PUBLIC_AUTH0_DOMAIN || '',
      clientID: process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID || '',
      redirectUri: process.env.NEXT_PUBLIC_AUTH0_CALLBACK_URL || '',
      responseType: 'token id_token',
      scope: 'openid profile email offline_access',
    });
  }

  login = (): void => {
    this.auth0.authorize({
      connection: 'google-oauth2',
      accessType: 'offline',
      // eslint-disable-next-line @typescript-eslint/camelcase
      connection_scope: 'https://www.googleapis.com/auth/drive.file',
      scope:
        'openid profile email offline_access budget:generate budget:read budget:write',
      audience: 'quantum-budget-api',
      // prompt: 'login',
      approvalPrompt: 'force',
    });
  };

  silentLogin = (): void => {
    this.auth0.authorize({
      connection: 'google-oauth2',
      accessType: 'offline',
      // eslint-disable-next-line @typescript-eslint/camelcase
      connection_scope: 'https://www.googleapis.com/auth/drive.file',
      scope:
        'openid profile email offline_access budget:generate budget:read budget:write',
      audience: 'quantum-budget-api',
      prompt: 'none',
    });
  };

  logout = (): void => {
    this.auth0.logout({
      clientID: process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID || '',
      returnTo: process.env.NEXT_PUBLIC_AUTH0_LOGOUT_URL || '',
    });
  };

  handleAuthentication = async (): Promise<User | null> => {
    return new Promise((resolve, reject) => {
      this.auth0.parseHash((err, authResult) => {
        if (err) {
          reject();
        }

        if (authResult && authResult.accessToken && authResult.idToken) {
          this.auth0.client.userInfo(
            authResult.accessToken,
            function (err, userInfo) {
              const user: User = {
                accessToken: authResult.accessToken || '',
                idToken: authResult.idToken || '',
                userId: userInfo.sub || '',
                givenName: userInfo.given_name || '',
                imageUrl: userInfo.picture,
                email: userInfo.email || '',
                emailVerified: userInfo.email_verified || false,
                expiresAt: authResult.expiresIn * 1000 + new Date().getTime(),
                permissions:
                  authResult.idTokenPayload[
                    'https://quantumbudget.com/user_authorization'
                  ].permissions,
              };
              resolve(user);
            }
          );
        } else {
          this.history.push(Route.HomePage);
        }
      });
    });
  };
}
