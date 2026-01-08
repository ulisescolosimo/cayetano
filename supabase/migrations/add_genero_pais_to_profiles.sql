-- Agregar campos genero y pais a la tabla profiles
ALTER TABLE profiles 
ADD COLUMN IF NOT EXISTS genero TEXT CHECK (genero IN ('masculino', 'femenino')),
ADD COLUMN IF NOT EXISTS pais TEXT;
