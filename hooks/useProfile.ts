import { useState, useEffect, useCallback } from 'react'
import { supabase } from '@/lib/supabase/client'
import { User } from '@supabase/supabase-js'

export interface Profile {
  id: string
  nombre: string | null
  apellido: string | null
  email: string | null
  created_at?: string
  updated_at?: string
}

export function useProfile(user: User | null) {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchProfile = useCallback(async () => {
    if (!user) {
      setProfile(null)
      setLoading(false)
      return
    }

    try {
      setLoading(true)
      setError(null)

      const { data, error: fetchError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

      if (fetchError) {
        // Si no existe el perfil, crear uno vacío
        if (fetchError.code === 'PGRST116') {
          const { data: newProfile, error: createError } = await supabase
            .from('profiles')
            .insert({
              id: user.id,
              email: user.email,
              nombre: null,
              apellido: null,
            })
            .select()
            .single()

          if (createError) throw createError
          setProfile(newProfile)
        } else {
          throw fetchError
        }
      } else {
        setProfile(data)
      }
    } catch (err: any) {
      setError(err.message)
      console.error('Error fetching profile:', err)
    } finally {
      setLoading(false)
    }
  }, [user])

  useEffect(() => {
    fetchProfile()
  }, [fetchProfile])

  const updateProfile = async (updates: { nombre?: string; apellido?: string; email?: string }) => {
    if (!user) {
      throw new Error('Usuario no autenticado')
    }

    try {
      setError(null)

      const { data, error: updateError } = await supabase
        .from('profiles')
        .update({
          ...updates,
          updated_at: new Date().toISOString(),
        })
        .eq('id', user.id)
        .select()
        .single()

      if (updateError) throw updateError

      setProfile(data)
      return data
    } catch (err: any) {
      setError(err.message)
      throw err
    }
  }

  const isProfileComplete = () => {
    return profile?.nombre && profile?.apellido && profile.nombre.trim() !== '' && profile.apellido.trim() !== ''
  }

  const refreshProfile = async () => {
    await fetchProfile()
  }

  return {
    profile,
    loading,
    error,
    updateProfile,
    refreshProfile,
    isProfileComplete: isProfileComplete(),
  }
}

