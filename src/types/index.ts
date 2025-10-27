// 项目类型
export interface Project {
  id: number;
  title: string;
  description: string;
  githubUrl: string;
  image: string;
}

// 论文类型
export interface Paper {
  id: number;
  title: string;
  authors: string;
  journal: string;
  overleafUrl: string;
  status: '已发表' | '撰写中' | '待投稿';
}

// 生活记录类型
export interface LifeEntry {
  id: number;
  title: string;
  date: string;
  content: string;
  image: string;
}

// 时间线项目类型（简历）
export interface TimelineItem {
  period: string;
  title: string;
  institution: string;
  description: string;
}

// 技能类型（简历）
export interface Skill {
  name: string;
  level: number; // 0-100
}