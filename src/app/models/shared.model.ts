export interface SharedModel<Data> {
  success: boolean,
  data: Data,
  message: string,
  errors: { [key: string]: string[] } | string[],
}
