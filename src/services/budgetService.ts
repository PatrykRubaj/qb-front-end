import axios, { AxiosInstance } from 'axios';
import { BudgetResponse, BudgetToGenerate, ReadState } from '../redux/state';

export default class BudgetService {
  private axiosInstance: AxiosInstance = null;
  private accessToken: string = null;
  private apiUrl: string = null;
  private userId: string = null;
  private httpTimeout: number = 0;

  constructor(accessToken: string, userId: string) {
    this.accessToken = accessToken;
    this.userId = userId;
    this.apiUrl = process.env.NEXT_PUBLIC_BACKEND_API;
    this.axiosInstance = this.getAxiosInstance();
    this.httpTimeout = Number(process.env.NEXT_PUBLIC_AXIOS_TIMEOUT);
  }

  get = async (): Promise<ReadState | null> => {
    let responseToReturn: ReadState | null = null;
    const url = `budget/${encodeURI(this.userId)}`;

    try {
      const response = await this.axiosInstance.get(url);

      if (response.data?.error != null) {
        return null;
      } else {
        const returnedResponse = response.data as any;

        responseToReturn = {
          categories: returnedResponse.categories,
          subcategories: returnedResponse.subcategories,
          incomes: returnedResponse.incomes,
          country: returnedResponse.country,
          user: returnedResponse.user,
        };
      }
    } catch (ex) {
      console.log('Exception: ', ex);
    }

    return responseToReturn;
  };

  generateBudget = async (
    budget: BudgetToGenerate
  ): Promise<BudgetResponse | null> => {
    let responseToReturn: BudgetResponse | null = null;
    const url = `budget`;

    try {
      const response = await this.axiosInstance.post(url, budget);
      if (response.data?.error != null) {
        responseToReturn = {
          errors: {
            code: response.data?.error.code,
            message: response.data?.error.message,
          },
        };
      } else {
        responseToReturn = response.data as BudgetResponse;
      }
    } catch (ex) {
      console.log('Exception', ex);

      if (ex.response) {
        responseToReturn = {
          errors: {
            code: ex.response.status,
            message: ex.response.data,
          },
        };
      } else if (ex.request) {
        responseToReturn = {
          errors: {
            code: 0,
            message: ex.request,
          },
        };
      } else {
        responseToReturn = {
          errors: {
            code: 0,
            message: ex.message,
          },
        };
      }
    }

    return responseToReturn;
  };

  private getAxiosInstance = (): AxiosInstance => {
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
