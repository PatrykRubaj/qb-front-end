import auth0, { WebAuth } from "auth0-js";
import { History } from "history";
import { User } from "../SpreadsheetGeneration/state";

export default class Auth {
  private history: History<History.PoorMansUnknown>;
  private auth0: WebAuth;

  constructor(history: History<History.PoorMansUnknown>) {
    this.history = history;
    this.auth0 = new auth0.WebAuth({
      domain: process.env.REACT_APP_AUTH0_DOMAIN || "",
      clientID: process.env.REACT_APP_AUTH0_CLIENT_ID || "",
      redirectUri: process.env.REACT_APP_AUTH0_CALLBACK_URL || "",
      responseType: "token id_token",
      scope: "openid profile email offline_access",
    });
  }

  login = (): void => {
<<<<<<< HEAD
    this.auth0.authorize({
      connection: "google-oauth2",
      accessType: "offline",
      // eslint-disable-next-line @typescript-eslint/camelcase
      connection_scope: "https://www.googleapis.com/auth/spreadsheets",
      scope: "openid profile email offline_access",
    });
  };

  handleAuthentication = async (): Promise<User | null> => {
    return new Promise((resolve, reject) => {
      this.auth0.parseHash((err, authResult) => {
        if (err) {
          reject();
        }

        if (authResult && authResult.accessToken && authResult.idToken) {
          this.history.push("/");

          this.auth0.client.userInfo(authResult.accessToken, function(
            err,
            userInfo
          ) {
            const user: User = {
              accessToken: authResult.accessToken || "",
              idToken: authResult.idToken || "",
              givenName: "Patryk",
              imageUrl: userInfo.picture,
              email: userInfo.email || "",
              emailVerified: userInfo.email_verified || false,
            };

            resolve(user);
          });
        }
      });
    });
  };
}
