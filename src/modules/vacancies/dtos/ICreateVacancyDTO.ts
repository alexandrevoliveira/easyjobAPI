interface ICreateVacancyDTO {
  role: string;
  type?: string;
  area?: string;
  requirements?: string[];
  salary?: number;
  quantity: number;
  company_id?: string;
}

export { ICreateVacancyDTO };
