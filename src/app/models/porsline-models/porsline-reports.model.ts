export interface PorslineReport {
  questions: {[key:string|number] : Question};
  survey: Survey
  welcome: Welcome
  report: Report
  score: Score
  variables: any[]
  is_general: boolean
  active: boolean
}

export interface SurveyReport {
  questions: Question[]
  survey: Survey
  welcome: Welcome
  report: Report
  score: Score
  variables: any[]
  is_general: boolean
  active: boolean
}

export interface Question {
  id: number
  title: string
  type: number
  order: number
  show_charts: boolean
  image_video_active: boolean
  image_or_video: number
  image_path: string
  video_url: string
  image_name: string
  question_number_is_hidden: boolean
  related_group: any
  allow_multiple_select: boolean
  choices: Choice[]
  charts: Chart[]
  answer_required: boolean
  max_selectable_choices: number
  total_answers: number
}

export interface N0 {
  id: number
  title: string
  type: number
  order: number
  show_charts: boolean
  image_video_active: boolean
  image_or_video: number
  image_path: string
  video_url: string
  image_name: string
  question_number_is_hidden: boolean
  related_group: any
  allow_multiple_select: boolean
  choices: Choice[]
  charts: Chart[]
  answer_required: boolean
  max_selectable_choices: number
  total_answers: number
}

export interface Choice {
  title: string
  frequency: number
  id: number
}

export interface Chart {
  id: number
  type: number
  caption: string
  order: number
}

export interface Survey {
  name: string
  is_active: boolean
  is_closed: boolean
  is_deleted: boolean
  show_branding: boolean
  preview_code: string
}

export interface Welcome {}

export interface Report {
  title: string
  description: any
}

export interface Score {
  score_show_charts: boolean
  score_used: boolean
}
