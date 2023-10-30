type Checkin = {
  created_at: Date;
  overall_rating: number;
  charging_speed_rating: number;
  reliability_rating: number;
  convenience_safety_rating: number;
  charging_session_duration: number;
  energy_consumed: number;
  ev_connector_type: string;
  user_id: string;
  id: string;
  vehicle_id: string;
  comments: string;
  likes: number;
  working_chargers: number;
  wait_in_line: boolean;
  charged: boolean;
  max_charge_rate: number;
  anonymous: boolean;
  plug_type: number;
  station_id: string;

  users?: {
    email: string;
    id: string;
  };
};
