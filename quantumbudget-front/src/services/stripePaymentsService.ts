import axios, { AxiosInstance } from 'axios';
import {
  PaymentErrorMessage,
  PaymentSessionResponse,
  PriceTier,
} from '../redux/state';

export default class StripePaymentService {
  private apiUrl: string;
  private accessToken: string;
  private axiosInstance: AxiosInstance;
  private httpTimeout: number;

  constructor(accessToken: string) {
    this.apiUrl = process.env.NEXT_PUBLIC_BACKEND_API;
    this.accessToken = accessToken;
    this.axiosInstance = this.getAxiosInstance();
    this.httpTimeout = Number(process.env.NEXT_PUBLIC_AXIOS_TIMEOUT);
  }

  requestSessionId = async (price: PriceTier): Promise<string> => {
    try {
      let responseToReturn: PaymentSessionResponse | PaymentErrorMessage | null;

      const response = await this.axiosInstance.post(
        'payments/create-checkout-session',
        { priceTier: price }
      );

      if (response.data?.error != null) {
        responseToReturn = {
          message: `Error ${response.data?.error.code ?? 0}: ${
            response.data?.error.message
          }`,
        };
      } else {
        responseToReturn = response.data as PaymentSessionResponse;

        return responseToReturn.sessionId;
      }
    } catch (ex) {
      console.log('Exception', ex);

      //   if (ex.response) {
      //     responseToReturn = {
      //       errors: {
      //         code: ex.response.status,
      //         message: ex.response.data,
      //       },
      //     };
      //   } else if (ex.request) {
      //     responseToReturn = {
      //       errors: {
      //         code: 0,
      //         message: ex.request,
      //       },
      //     };
      //   } else {
      //     responseToReturn = {
      //       errors: {
      //         code: 0,
      //         message: ex.message,
      //       },
      //     };
      //   }
    }

    return null;
  };
  requestBillingPortalSessionId = async (): Promise<string> => {
    try {
      let responseToReturn: { url: string } | PaymentErrorMessage | null;

      const response = await this.axiosInstance.get('payments/customer-portal');

      if (response.data?.error != null) {
        responseToReturn = {
          message: `Error ${response.data?.error.code ?? 0}: ${
            response.data?.error.message
          }`,
        };
      } else {
        responseToReturn = response.data as { url: string };

        return responseToReturn.url;
      }
    } catch (ex) {
      console.log('Exception', ex);

      //   if (ex.response) {
      //     responseToReturn = {
      //       errors: {
      //         code: ex.response.status,
      //         message: ex.response.data,
      //       },
      //     };
      //   } else if (ex.request) {
      //     responseToReturn = {
      //       errors: {
      //         code: 0,
      //         message: ex.request,
      //       },
      //     };
      //   } else {
      //     responseToReturn = {
      //       errors: {
      //         code: 0,
      //         message: ex.message,
      //       },
      //     };
      //   }
    }

    return null;
  };

  getAxiosInstance = (): AxiosInstance => {
    const instance = axios.create({
      baseURL: `${this.apiUrl}/`,
      timeout: this.httpTimeout,
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
    });

    return instance;
  };
}
