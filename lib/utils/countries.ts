// Lista de países para selección
export const COUNTRIES = [
  // América del Sur
  { value: 'argentina', label: 'Argentina' },
  { value: 'bolivia', label: 'Bolivia' },
  { value: 'brasil', label: 'Brasil' },
  { value: 'chile', label: 'Chile' },
  { value: 'colombia', label: 'Colombia' },
  { value: 'ecuador', label: 'Ecuador' },
  { value: 'guayana', label: 'Guayana' },
  { value: 'paraguay', label: 'Paraguay' },
  { value: 'perú', label: 'Perú' },
  { value: 'surinam', label: 'Surinam' },
  { value: 'uruguay', label: 'Uruguay' },
  { value: 'venezuela', label: 'Venezuela' },
  // América Central y Caribe
  { value: 'belice', label: 'Belice' },
  { value: 'costa-rica', label: 'Costa Rica' },
  { value: 'cuba', label: 'Cuba' },
  { value: 'el-salvador', label: 'El Salvador' },
  { value: 'guatemala', label: 'Guatemala' },
  { value: 'haití', label: 'Haití' },
  { value: 'honduras', label: 'Honduras' },
  { value: 'jamaica', label: 'Jamaica' },
  { value: 'méxico', label: 'México' },
  { value: 'nicaragua', label: 'Nicaragua' },
  { value: 'panamá', label: 'Panamá' },
  { value: 'república-dominicana', label: 'República Dominicana' },
  { value: 'trinidad-y-tobago', label: 'Trinidad y Tobago' },
  // América del Norte
  { value: 'canadá', label: 'Canadá' },
  { value: 'estados-unidos', label: 'Estados Unidos' },
  // Europa
  { value: 'alemania', label: 'Alemania' },
  { value: 'bélgica', label: 'Bélgica' },
  { value: 'españa', label: 'España' },
  { value: 'francia', label: 'Francia' },
  { value: 'italia', label: 'Italia' },
  { value: 'países-bajos', label: 'Países Bajos' },
  { value: 'portugal', label: 'Portugal' },
  { value: 'reino-unido', label: 'Reino Unido' },
  { value: 'suiza', label: 'Suiza' },
  // Asia
  { value: 'china', label: 'China' },
  { value: 'corea-del-sur', label: 'Corea del Sur' },
  { value: 'india', label: 'India' },
  { value: 'japón', label: 'Japón' },
  { value: 'tailandia', label: 'Tailandia' },
  // África
  { value: 'egipto', label: 'Egipto' },
  { value: 'marruecos', label: 'Marruecos' },
  { value: 'sudáfrica', label: 'Sudáfrica' },
  // Oceanía
  { value: 'australia', label: 'Australia' },
  { value: 'nueva-zelanda', label: 'Nueva Zelanda' },
  // Otro
  { value: 'otro', label: 'Otro' },
] as const

export type CountryValue = typeof COUNTRIES[number]['value']
