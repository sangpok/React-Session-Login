import { checkFieldsStore } from '@Store/CheckFields';

export const useConfirmFields = (initialFields?: { [k: string]: boolean }) => {
  if (initialFields) {
    checkFieldsStore.initializeFields(initialFields);
  }

  return {
    isConfirmedField: checkFieldsStore.getField,
    isAllFieldConfirmed: checkFieldsStore.isAllChecked,
    confirmField: (fieldName: string) => checkFieldsStore.updateField({ [fieldName]: true }),
    unconfirmField: (fieldName: string) => checkFieldsStore.updateField({ [fieldName]: false }),
  };
};
