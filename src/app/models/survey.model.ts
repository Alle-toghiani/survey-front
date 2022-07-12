export interface SurveyModel {
  id: number;
  data: SurveyQuestion[];
  name: string;
  language: number;
  active: boolean;
  can_active: boolean;
  massage_text?: string;
  views: number;
  submitted_responses: number;
  closed: boolean;
  is_stopped: boolean;
  is_not_started: boolean;
  deleted: boolean;
  preview_code: string;
  report_code: string;
  score_charts_active: boolean;
  theme: number;
  background_image_config?: string;
  created_date: string;
  parent?: string;
  folder: {
    id: number,
    order: number,
    name: string
  }
}

interface SurveyQuestion{
  choices: SurveyChoice[];
  charts: SurveyCharts;
  id: number;
  title: string;
  type: number;
  order: number;
  show_charts: boolean;
  image_video_active: boolean;
  image_or_video: number;
  image_path: string;
  video_url: string;
  image_name: string;
  question_number_is_hidden: boolean;
  related_group: string;
  allow_multiple_select: boolean;
  isVisible: boolean;
}

interface SurveyCharts{
  id: number;
  title: string;
  type: number | string;
  order: number;
  caption: string;
}

export class SurveyChoice{
  id: number;
  title: string;
  frequency: number;
}
