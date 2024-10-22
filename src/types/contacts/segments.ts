type SegmentsListItem = {
  segmentId: number;
  segmentName: string;
  contacts: number;
  lastEdit: string;
};

export type SegmentsListResponse = {
  size: number;
  total: number;
  current: number;
  records: SegmentsListItem[];
  pages: number;
};
