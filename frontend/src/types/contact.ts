export type Contact = {
  id: number;
  name: string;
  email?: string;
  address?: string;
  notes?: string;
  contacted?: boolean;
  follow_up_needed?: boolean;
};
