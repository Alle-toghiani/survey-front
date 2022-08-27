export interface PorslineQuestion {
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
