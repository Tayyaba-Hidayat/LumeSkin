import { supabase } from "../supabase";

/**
 * Generic database helpers
 * Use once, reuse everywhere
 */

export const db = {
  patients: {
    create: (data: any) =>
      supabase.from("patients").insert(data),

    getAll: () =>
      supabase.from("patients").select("*"),

    getByUser: (userId: string) =>
      supabase.from("patients").select("*").eq("user_id", userId),
  },

  doctors: {
    create: (data: any) =>
      supabase.from("doctors").insert(data),

    getAll: () =>
      supabase.from("doctors").select("*"),
  },

  appointments: {
    create: (data: any) =>
      supabase.from("appointments").insert(data),

    getByDoctor: (doctorId: string) =>
      supabase.from("appointments").select("*").eq("doctor_id", doctorId),

    getByPatient: (patientId: string) =>
      supabase.from("appointments").select("*").eq("patient_id", patientId),
  },

  products: {
    getAll: () =>
      supabase.from("products").select("*"),
  },

  reviews: {
    create: (data: any) =>
      supabase.from("reviews").insert(data),
  },
};
