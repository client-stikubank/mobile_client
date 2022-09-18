export const RuleRequired = {
  required: { value: true, message: 'Tidak boleh kosong' }
}

export const RulePassword = {
  required: { value: true, message: 'Password tidak boleh kosong' },
  // pattern: {
  //   value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
  //   message:
  //     'Password must be at least one uppercase letter,one lowercase letter, and a number.',
  // },
  minLength: {
    value: 8,
    message: 'Password minimal 8 karakter'
  }
}
export const RuleName = {
  required: { value: true, message: 'Tidak boleh kosong' },
  pattern: {
    value: /^[a-zA-Z]{2,40}( [a-zA-Z]{2,40})+$/,
    message: 'Tidak boleh kosong'
  }
}
export const RuleConfirmPassword = {
  required: { value: true, message: 'Konfirmasi Password tidak cocok' },
  minLength: {
    value: 8,
    message: 'Konfirmasi Password tidak cocok'
  }
}
export const RuleEmail = {
  required: { value: true, message: 'Email tidak boleh kosong' },
  pattern: {
    value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i,
    message: 'Format email salah'
  }
}
export const RuleResetCode = {
  required: { value: true, message: 'Code is required' },
  maxLength: {
    value: 6,
    message: 'Code is six digits'
  },
  minLength: {
    value: 6,
    message: 'Code is six digits'
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
