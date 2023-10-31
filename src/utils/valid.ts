import validator from 'validator';

interface rule {
    method: typeof validator, 
    field: any, 
    args: any, 
    validWhen: any, 
    message: any
}

export default class ValidateForms {
  validations: any;
  constructor(validations: any) {
    this.validations = validations;
  }
  validate(state: any) {
    let validation = this.valid(state) as any;
    this.validations.forEach((rule: rule) => {

      if (!validation[rule.field].isInvalid) {
        const field_value = state[rule.field].toString();
        const args = rule.args || [];
        const validation_method: any = typeof rule.method === 'string' ?
          validator[rule.method] :
          rule.method

        if (validation_method(field_value, ...args, state) != rule.validWhen) {
          validation[rule.field] = {
            isInvalid: true,
            message: rule.message,
            cssValidate: 'is-invalid'
          }
          validation.isValid = false;
        }
      }
    });
    return validation;
  }


  /**
   * Create a object of validation
   * @param {object} state 
   */
  valid(state: any) {
    const validation = {} as any;
    this.validations.map((rule: any) => {
        validation[rule.field] = { isInvalid: false, message: '', cssValidate: typeof state === 'undefined' ? '' : 'is-valid' }
    });
    return { isValid: true, ...validation };
  }

   /**
   * Validate a field
   * @param {object} state 
   * @param {string} field 
   */
    validateField(state: any, field: any) {
        let validation = this.validField(state, field);
    
        this.validations.forEach((rule: rule) => {
          if (rule.field == field) {
            if (!validation[rule.field].isInvalid) {
              const field_value = state[rule.field].toString();
              const args = rule.args || [];
              const validation_method: any = typeof rule.method === 'string' ?
                validator[rule.method] :
                rule.method
              if (validation_method(field_value, ...args, state) != rule.validWhen) {
                validation[rule.field] = {
                  isInvalid: true,
                  message: rule.message,
                  cssValidate: 'is-invalid'
                }
                validation.isValid = false;
              }
            }
          }
        });
        return validation;
    }

    /**
   * Validate a specific field 
   * @param {object} state 
   * @param {string} field 
   */
    validField(state: any, field: any) {
        const validation = state.validation;
        const isValidForm = state.validation.isValid;
        this.validations.map((rule: rule) => {
        if (rule.field == field) {
            validation[rule.field] = { isInvalid: false, message: '', cssValidate: 'is-valid' }
        }
        });
        return { isValidForm, ...validation };
    }
}

export function getValidationData (validation: any, name: any, prop = 'message') {
  if (validation)
      return validation[name] ? validation[name]?.[prop] : ''
}