export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Tables<T extends keyof Database['public']['Tables']> =
	Database['public']['Tables'][T]['Row'];

export interface Database {
	public: {
		Tables: {
			booking: {
				Row: {
					cabin_id: number;
					cabin_price: number;
					created_at: string;
					end_date: string;
					extras_price: number;
					guest_id: number;
					has_breakfast: boolean;
					id: number;
					is_paid: boolean;
					num_guests: number;
					num_nights: number;
					observations: string | null;
					start_date: string;
					status: string;
					total_price: number;
				};
				Insert: {
					cabin_id: number;
					cabin_price: number;
					created_at?: string;
					end_date: string;
					extras_price: number;
					guest_id: number;
					has_breakfast: boolean;
					id?: number;
					is_paid: boolean;
					num_guests: number;
					num_nights: number;
					observations?: string | null;
					start_date: string;
					status: string;
					total_price: number;
				};
				Update: {
					cabin_id?: number;
					cabin_price?: number;
					created_at?: string;
					end_date?: string;
					extras_price?: number;
					guest_id?: number;
					has_breakfast?: boolean;
					id?: number;
					is_paid?: boolean;
					num_guests?: number;
					num_nights?: number;
					observations?: string | null;
					start_date?: string;
					status?: string;
					total_price?: number;
				};
				Relationships: [
					{
						foreignKeyName: 'booking_cabin_id_fkey';
						columns: ['cabin_id'];
						referencedRelation: 'cabin';
						referencedColumns: ['id'];
					},
					{
						foreignKeyName: 'booking_guest_id_fkey';
						columns: ['guest_id'];
						referencedRelation: 'guest';
						referencedColumns: ['id'];
					}
				];
			};
			cabin: {
				Row: {
					created_at: string;
					description: string;
					discount: number | null;
					id: number;
					image_url: string;
					max_capacity: number;
					name: string;
					regular_price: number;
				};
				Insert: {
					created_at?: string;
					description: string;
					discount?: number | null;
					id?: number;
					image_url: string;
					max_capacity: number;
					name: string;
					regular_price: number;
				};
				Update: {
					created_at?: string;
					description?: string;
					discount?: number | null;
					id?: number;
					image_url?: string;
					max_capacity?: number;
					name?: string;
					regular_price?: number;
				};
				Relationships: [];
			};
			guest: {
				Row: {
					country_flag: string | null;
					created_at: string;
					email: string;
					full_name: string;
					id: number;
					national_id: string | null;
					nationality: string | null;
				};
				Insert: {
					country_flag?: string | null;
					created_at?: string;
					email: string;
					full_name: string;
					id?: number;
					national_id?: string | null;
					nationality?: string | null;
				};
				Update: {
					country_flag?: string | null;
					created_at?: string;
					email?: string;
					full_name?: string;
					id?: number;
					national_id?: string | null;
					nationality?: string | null;
				};
				Relationships: [];
			};
			settings: {
				Row: {
					breakfast_price: number;
					created_at: string;
					id: number;
					max_booking_length: number;
					max_guests_per_booking: number;
					min_booking_length: number;
				};
				Insert: {
					breakfast_price: number;
					created_at?: string;
					id?: number;
					max_booking_length: number;
					max_guests_per_booking: number;
					min_booking_length: number;
				};
				Update: {
					breakfast_price?: number;
					created_at?: string;
					id?: number;
					max_booking_length?: number;
					max_guests_per_booking?: number;
					min_booking_length?: number;
				};
				Relationships: [];
			};
		};
		Views: {
			[_ in never]: never;
		};
		Functions: {
			[_ in never]: never;
		};
		Enums: {
			[_ in never]: never;
		};
		CompositeTypes: {
			[_ in never]: never;
		};
	};
}
