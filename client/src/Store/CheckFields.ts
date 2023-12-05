type CheckField = { [k: string]: boolean };

let checkFields: CheckField = {};

export const checkFieldsStore = {
  initializeFields(fields: CheckField) {
    checkFields = { ...fields };
  },

  updateField(field: CheckField) {
    checkFields = { ...checkFields, ...field };
  },

  getField(fieldName: string) {
    return checkFields[fieldName];
  },

  isAllChecked() {
    return !Object.values(checkFields).includes(false);
  },
};
