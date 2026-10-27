export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.18"
  }
  public: {
    Tables: {
      barbero_servicios: {
        Row: {
          barbero_id: string
          servicio_id: string
        }
        Insert: {
          barbero_id: string
          servicio_id: string
        }
        Update: {
          barbero_id?: string
          servicio_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "barbero_servicios_barbero_id_fkey"
            columns: ["barbero_id"]
            isOneToOne: false
            referencedRelation: "barberos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "barbero_servicios_servicio_id_fkey"
            columns: ["servicio_id"]
            isOneToOne: false
            referencedRelation: "servicios"
            referencedColumns: ["id"]
          },
        ]
      }
      barberos: {
        Row: {
          activo: boolean
          apellido: string
          foto_url: string | null
          id: string
          nombre: string
        }
        Insert: {
          activo?: boolean
          apellido: string
          foto_url?: string | null
          id?: string
          nombre: string
        }
        Update: {
          activo?: boolean
          apellido?: string
          foto_url?: string | null
          id?: string
          nombre?: string
        }
        Relationships: []
      }
      bloqueos: {
        Row: {
          barbero_id: string | null
          fin: string
          id: string
          inicio: string
        }
        Insert: {
          barbero_id?: string | null
          fin: string
          id?: string
          inicio: string
        }
        Update: {
          barbero_id?: string | null
          fin?: string
          id?: string
          inicio?: string
        }
        Relationships: [
          {
            foreignKeyName: "bloqueos_barbero_id_fkey"
            columns: ["barbero_id"]
            isOneToOne: false
            referencedRelation: "barberos"
            referencedColumns: ["id"]
          },
        ]
      }
      combo_items: {
        Row: {
          combo_id: string
          servicio_id: string
        }
        Insert: {
          combo_id: string
          servicio_id: string
        }
        Update: {
          combo_id?: string
          servicio_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "combo_items_combo_id_fkey"
            columns: ["combo_id"]
            isOneToOne: false
            referencedRelation: "servicios"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "combo_items_servicio_id_fkey"
            columns: ["servicio_id"]
            isOneToOne: false
            referencedRelation: "servicios"
            referencedColumns: ["id"]
          },
        ]
      }
      horarios_trabajo: {
        Row: {
          barbero_id: string
          dia_semana: number
          hora_fin: string
          hora_inicio: string
          id: string
        }
        Insert: {
          barbero_id: string
          dia_semana: number
          hora_fin: string
          hora_inicio: string
          id?: string
        }
        Update: {
          barbero_id?: string
          dia_semana?: number
          hora_fin?: string
          hora_inicio?: string
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "horarios_trabajo_barbero_id_fkey"
            columns: ["barbero_id"]
            isOneToOne: false
            referencedRelation: "barberos"
            referencedColumns: ["id"]
          },
        ]
      }
      servicios: {
        Row: {
          activo: boolean
          categoria: string | null
          descripcion: string | null
          duracion_minutos: number
          es_combo: boolean
          id: string
          nombre: string
          precio: number
        }
        Insert: {
          activo?: boolean
          categoria?: string | null
          descripcion?: string | null
          duracion_minutos: number
          es_combo?: boolean
          id?: string
          nombre: string
          precio: number
        }
        Update: {
          activo?: boolean
          categoria?: string | null
          descripcion?: string | null
          duracion_minutos?: number
          es_combo?: boolean
          id?: string
          nombre?: string
          precio?: number
        }
        Relationships: []
      }
      turnos: {
        Row: {
          barbero_id: string
          created_at: string
          duracion_minutos: number
          email: string | null
          estado: Database["public"]["Enums"]["estado_turno"]
          fin: string
          id: string
          inicio: string
          nombre_cliente: string
          notas: string | null
          precio: number
          servicio_id: string
          telefono: string
        }
        Insert: {
          barbero_id: string
          created_at?: string
          duracion_minutos: number
          email?: string | null
          estado?: Database["public"]["Enums"]["estado_turno"]
          fin: string
          id?: string
          inicio: string
          nombre_cliente: string
          notas?: string | null
          precio: number
          servicio_id: string
          telefono: string
        }
        Update: {
          barbero_id?: string
          created_at?: string
          duracion_minutos?: number
          email?: string | null
          estado?: Database["public"]["Enums"]["estado_turno"]
          fin?: string
          id?: string
          inicio?: string
          nombre_cliente?: string
          notas?: string | null
          precio?: number
          servicio_id?: string
          telefono?: string
        }
        Relationships: [
          {
            foreignKeyName: "turnos_barbero_id_fkey"
            columns: ["barbero_id"]
            isOneToOne: false
            referencedRelation: "barberos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "turnos_servicio_id_fkey"
            columns: ["servicio_id"]
            isOneToOne: false
            referencedRelation: "servicios"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      is_admin: { Args: never; Returns: boolean }
      obtener_disponibilidad: {
        Args: {
          p_barbero_id: string
          p_fecha: string
          p_paso_minutos?: number
          p_servicio_id: string
          p_zona?: string
        }
        Returns: {
          fin: string
          inicio: string
        }[]
      }
      reservar_turno: {
        Args: {
          p_barbero_id: string
          p_email?: string
          p_inicio: string
          p_max_dias?: number
          p_nombre: string
          p_paso_minutos?: number
          p_servicio_id: string
          p_telefono: string
          p_zona?: string
        }
        Returns: Json
      }
      reservar_turno_publico: {
        Args: {
          p_barbero_id: string
          p_email?: string
          p_inicio: string
          p_nombre: string
          p_servicio_id: string
          p_telefono: string
        }
        Returns: Json
      }
    }
    Enums: {
      estado_turno:
        | "pendiente"
        | "confirmado"
        | "cancelado"
        | "completado"
        | "no_asistio"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      estado_turno: [
        "pendiente",
        "confirmado",
        "cancelado",
        "completado",
        "no_asistio",
      ],
    },
  },
} as const
