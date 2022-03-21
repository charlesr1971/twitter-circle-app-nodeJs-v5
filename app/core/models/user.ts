export interface User {
  id?: string;
  screen_name?: string;
  avatar?: string;
  total?: number;
  circleData?: {
    centerX?: number;
    centerY?: number;
    radius?: number;
  };
};
