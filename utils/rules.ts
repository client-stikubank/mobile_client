export const RuleRequired = {
  required: { value: true, message: 'Tidak boleh kosong' }
}

export const RulePassword = (t: any) => {
  return {
    required: { value: true, message: t('auth:v_password_required') },
    minLength: {
      value: 8,
      message: t('auth:v_password_minimum')
    }
  }
}
export const RuleName = () => {
  return {
    required: { value: true, message: 'Tidak boleh kosong' },
    pattern: {
      value: /^[a-zA-Z]{2,40}( [a-zA-Z]{2,40})+$/,
      message: 'Tidak boleh kosong'
    }
  }
}
export const RuleConfirmPassword = (t: any, password: string) => {
  return {
    required: {
      value: true,
      message: t('auth:v_password_confirmation_required')
    },
    minLength: {
      value: 8,
      message: t('auth:v_password_confirmation_minimum')
    },
    validate: (value: string) => {
      if (password !== value) {
        return t('auth:v_password_confirmation_not_match')
      }
    }
  }
}
export const RuleEmail = (t: any) => {
  return {
    required: { value: true, message: t('auth:v_email_required') },
    pattern: {
      value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i,
      message: t('auth:v_email_format')
    }
  }
}
export const RuleResetCode = (t: any) => {
  return {
    required: { value: true, message: t('auth:v_reset_code_required') },
    maxLength: {
      value: 6,
      message: t('auth:v_reset_code_digit')
    },
    minLength: {
      value: 6,
      message: t('auth:v_reset_code_digit')
    }
  }
}
export const RuleOnlyNumber = {
  required: { value: true, message: 'Value is required' },
  pattern: {
    value: /^[0-9]+$/,
    message: 'Please enter a number'
  },
  maxLength: {
    value: 3,
    message: 'Please enter a number'
  }
}
