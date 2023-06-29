import { createApi } from "./index";

export interface IState {
  why_choose: string;
  phone: string;
  address: string;
  is_main_bank: boolean | null;
  main_bank_why: string;
  is_investment: boolean | null;
  investment_prefer: string;
  is_investment_plan: boolean | null;
  domain_referer: string;
}
export const FormApi = {
  async form(params: IState): Promise<any> {
    const data = await createApi.post(
      "/api/form",
      Object.assign({}, params, {
        domain_referer: window.location.href,
      })
    );
    return data;
  },
};
