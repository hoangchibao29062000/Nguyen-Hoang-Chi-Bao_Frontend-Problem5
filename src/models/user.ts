export interface UserInfo {
  id: number | string;
  username: string;
  access_token: string;
  refresh_token: string;
  info_id: Info
}

export interface Info {
  id: number;
  point_trust: number;
  is_verify_email: boolean;
  is_verify_phone: boolean;
  is_block: boolean;
  block_time: Date;
  first_name: string;
  last_name: string;
  birthday: Date;
  phone: string;
  sign_recent: Date;
}

// export interface Example {
//   id: number;
//   create_at: Date;
//   update_at: Date;
//   username: string;
//   password: string;
//   ip: string;
//   device: string;
//   access_token: string;
//   refresh_token: string;
//   is_active: boolean;
//   infoIdId: ExampleInfo;
//   email: string;
// }
