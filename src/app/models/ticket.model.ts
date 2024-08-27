export interface Ticket {
  id: number;
  title: string;
  description: string;
  raisedBy: string;
  department: string;
  resolvedBy?: string;  // Optional field
  status: string;
}
