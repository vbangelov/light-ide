export interface View {
  id: string;
  src: string;
  position: number; // now 1-based index
  display?: boolean;
}

export interface ViewLayout {
  id: string;
  columns: 1 | 2 | 3;
  views: View[];
}
