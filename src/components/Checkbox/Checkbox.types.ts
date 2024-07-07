export interface ICheckbox {
  id: string;
  isChecked: boolean;
  onChange: any;
  indeterminateCheckbox?: boolean;
  isError?: boolean;
}
