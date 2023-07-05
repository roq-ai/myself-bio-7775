import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface WorkInterface {
  id?: string;
  files: string;
  user_id?: string;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  _count?: {};
}

export interface WorkGetQueryInterface extends GetQueryInterface {
  id?: string;
  files?: string;
  user_id?: string;
}
