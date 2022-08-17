export interface FolderModel{
  id: number;
  order: number;
  name: string;
  surveys: FolderSurveyModel[];

  active?: boolean;
}

interface  FolderSurveyModel{
  id: number;
  name: string;
  folder_id: number;
  language: number;
  created_date: string;
  active: boolean;
  can_active: boolean;
  is_stopped: boolean;
  views: number;
  submitted_responses: number;
  preview_code: string;
  report_code: string;
  url_slug?: any;
  is_template: boolean;
  question_count: number;
  theme: any;
}
