// Función para traducir errores de Supabase al castellano
export const translateSupabaseError = (error: any): string => {
  const errorMessage = error?.message || ''
  const errorCode = error?.code || ''

  // Errores comunes de Supabase
  const errorTranslations: { [key: string]: string } = {
    'User already registered': 'El usuario ya está registrado',
    'Email already registered': 'Este correo electrónico ya está registrado',
    'Invalid email': 'Correo electrónico inválido',
    'Password should be at least 6 characters': 'La contraseña debe tener al menos 6 caracteres',
    'Email rate limit exceeded': 'Límite de intentos excedido. Intentá más tarde',
    'Signup is disabled': 'El registro está deshabilitado',
    'Email not confirmed': 'Por favor, confirmá tu correo electrónico',
    'Invalid login credentials': 'Correo electrónico o contraseña incorrectos',
    'Invalid credentials': 'Correo electrónico o contraseña incorrectos',
    'User not found': 'Usuario no encontrado',
    'Email address not authorized': 'Correo electrónico no autorizado',
    'Token has expired': 'El enlace ha expirado',
    'Unable to validate email address: invalid format': 'Formato de correo electrónico inválido',
    'Password is too weak': 'La contraseña es muy débil',
    'For security purposes, you can only request this once every 60 seconds': 'Por seguridad, solo podés solicitar esto una vez cada 60 segundos',
  }

  // Buscar traducción por mensaje completo
  if (errorTranslations[errorMessage]) {
    return errorTranslations[errorMessage]
  }

  // Buscar traducción por código de error
  if (errorCode) {
    const codeTranslations: { [key: string]: string } = {
      'signup_disabled': 'El registro está deshabilitado',
      'email_rate_limit_exceeded': 'Límite de intentos excedido. Intentá más tarde',
      'user_already_registered': 'El usuario ya está registrado',
      'invalid_email': 'Correo electrónico inválido',
      'weak_password': 'La contraseña es muy débil',
    }

    if (codeTranslations[errorCode]) {
      return codeTranslations[errorCode]
    }
  }

  // Si contiene palabras clave, traducir parcialmente
  if (errorMessage.toLowerCase().includes('already registered') || 
      errorMessage.toLowerCase().includes('user already')) {
    return 'El usuario ya está registrado'
  }

  if (errorMessage.toLowerCase().includes('invalid email') || 
      errorMessage.toLowerCase().includes('email format')) {
    return 'Correo electrónico inválido'
  }

  if (errorMessage.toLowerCase().includes('password') && 
      errorMessage.toLowerCase().includes('weak')) {
    return 'La contraseña es muy débil'
  }

  if (errorMessage.toLowerCase().includes('rate limit')) {
    return 'Límite de intentos excedido. Intentá más tarde'
  }

  // Si contiene palabras clave de login, devolver mensaje de login
  if (errorMessage.toLowerCase().includes('login') || 
      errorMessage.toLowerCase().includes('credentials') ||
      errorMessage.toLowerCase().includes('password') && errorMessage.toLowerCase().includes('incorrect')) {
    return 'Correo electrónico o contraseña incorrectos'
  }

  // Si no hay traducción, devolver mensaje genérico
  return 'Error al procesar la solicitud. Intentá nuevamente'
}

