export interface PorslineSurvey {
  id: number;
  name: string;
  active: boolean;
  questions: Question[];
  hasresponder: boolean;
  submitted_responses: number;
  language: number;
  can_active: boolean;
  theme: Theme;
  background_image_config?: any;
  is_stopped: boolean;
  deleted: boolean;
  closed: boolean;
  previewCode: string;
  urlSlug?: any;
  reportCode: string;
  created_at: Date;
  featuresUsage: FeaturesUsage;
  variables: any[];
}

export interface Choice {
  id: number;
  order: number;
  name: string;
  hidden: boolean;
  alt_name?: any;
}

export interface Question {
  id: number;
  title: string;
  description_text_active: boolean;
  description_text: string;
  order: number;
  type: number;
  has_response: boolean;
  answer_type: number;
  number_min_value: number;
  number_max_value: number;
  answer_max_length: number;
  is_decimal: boolean;
  answer_min_length: number;
  answer_required: boolean;
  image_video_active: boolean;
  image_or_video: number;
  image_path: string;
  video_url: string;
  image_name: string;
  related_group?: any;
  logic: any[];
  score: any[];
  regex_type: number;
  regex_value?: any;
  regex_placeholder: string;
  regex_validation_message: string;
  final_destination?: any;
  question_number_is_hidden: boolean;
  correct_numeric_answer?: any;
  allow_multiple_select?: boolean;
  max_selectable_choices?: number;
  min_selectable_choices?: number;
  vertical_choices?: boolean;
  choices: Choice[];
  randomize?: boolean;
  correct_choice?: any;
}

export interface Theme {
  id: number;
  order: number;
  background_color: string;
  question_color: string;
  answer_color: string;
  button_color: string;
  accent_color: string;
  font_family: number;
  font_size: number;
  background_image_config?: any;
  background_image?: any;
  background_image_repeat: number;
  background_image_brightness: number;
  background_image_fit: number;
  background_image_position: number;
  background_image_size_percentage: number;
  is_public: boolean;
  thumbnail_url?: any;
}

export interface FeaturesUsage {
  authentication: boolean;
  authentication_type?: any;
  noSpam: boolean;
  tagSpam: boolean;
  location: boolean;
  notification: boolean;
  advancedNotification: boolean;
  edit_response_enabled: boolean;
  show_answer_sheet_to_responder_enabled: boolean;
  show_answer_key_enabled: boolean;
}


