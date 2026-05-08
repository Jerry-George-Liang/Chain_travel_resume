import { generateUUID } from "@/utils/uuid";
import { initialResumeState } from "@/config/initialResumeData";
import { DEFAULT_TEMPLATES } from "@/config";

export const escapeHtml = (value: unknown) =>
  typeof value === "string"
    ? value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    : String(value ?? "");

export const toString = (value: unknown) =>
  typeof value === "string" ? value.trim() : typeof value === "number" || typeof value === "boolean" ? String(value) : "";

export const toStringArray = (value: unknown) => {
  if (Array.isArray(value)) {
    return value
      .map((item) => toString(item))
      .filter(Boolean);
  }

  if (typeof value === "string") {
    return value
      .split(/\r?\n/)
      .map((line) => line.replace(/^[-*•\d.)\s]+/, "").trim())
      .filter(Boolean);
  }

  return [] as string[];
};

export const toListHtml = (value: unknown) => {
  const items = toStringArray(value);
  if (items.length === 0) return "";
  return `<ul>${items
    .map((item) => `<li>${escapeHtml(item)}</li>`)
    .join("")}</ul>`;
};

export const extractJsonContent = (content: unknown) => {
  if (typeof content !== "string" || !content.trim()) {
    throw new Error("Invalid AI response: expected string content");
  }

  const direct = content.trim();
  try {
    return JSON.parse(direct);
  } catch (error) { }

  const fencedMatch = direct.match(/```(?:json)?\s*([\s\S]*?)```/i);
  if (fencedMatch?.[1]) {
    try {
      return JSON.parse(fencedMatch[1].trim());
    } catch (error) { }
  }

  const objectMatch = direct.match(/\{[\s\S]*\}/);
  if (objectMatch?.[0]) {
    try {
      return JSON.parse(objectMatch[0]);
    } catch (error) { }
  }

  throw new Error("Invalid AI JSON content");
};

function pickString(obj: any, ...keys: string[]): string {
  for (const key of keys) {
    const val = obj?.[key];
    if (val !== undefined && val !== null && val !== "") {
      return toString(val);
    }
  }
  return "";
}

function collectAllRemainingStrings(obj: any, excludeKeys: Set<string>): string[] {
  if (!obj || typeof obj !== "object") return [];
  const result: string[] = [];
  for (const [key, val] of Object.entries(obj)) {
    if (excludeKeys.has(key)) continue;
    if (typeof val === "string" && val.trim()) result.push(val.trim());
    else if (Array.isArray(val)) {
      for (const item of val) {
        if (typeof item === "string" && item.trim()) result.push(item.trim());
        else if (item && typeof item === "object") {
          const sub = collectAllRemainingStrings(item, new Set());
          result.push(...sub);
        }
      }
    } else if (val && typeof val === "object") {
      const sub = collectAllRemainingStrings(val, new Set());
      if (sub.length > 0) result.push(`${key}：${sub.join("; ")}`);
    }
  }
  return result;
}

type ResumeJsonSource = "boss" | "wondercv" | "native" | "standard" | "chinese" | "hybrid" | "unknown";

const detectResumeFormat = (data: Record<string, any>): ResumeJsonSource => {
  const keys = Object.keys(data);

  if (keys.includes("workExpList") || keys.includes("eduExpList")) return "boss";
  if (keys.includes("basics") && (keys.includes("work") || keys.includes("education"))) return "wondercv";
  if (keys.includes("basic")
    && keys.includes("experience")
    && (keys.includes("menuSections") || keys.includes("globalSettings") || keys.includes("skillContent"))) return "native";
  if (keys.includes("basic") && keys.includes("experience")) return "standard";
  if (keys.some((k) => ["基本信息", "教育经历", "项目经历", "工作经历", "专业技能"].includes(k))) return "chinese";
  if ((keys.includes("basic_info") || keys.includes("education") || keys.includes("projects")) && !keys.includes("basic")) return "hybrid";
  return "unknown";
};

function extractBasic(obj: any): Record<string, any> {
  return {
    name: pickString(obj, "name", "姓名", "fullName", "userName"),
    title: pickString(obj, "title", "jobTitle", "position", "求职岗位", "期望职位", "岗位", "职位", "job_title"),
    email: pickString(obj, "email", "mail", "邮箱", "emailAddress"),
    phone: pickString(obj, "phone", "mobile", "telephone", "电话", "手机", "手机号", "contactNumber"),
    location: pickString(obj, "location", "city", "address", "期望城市", "所在城市", "城市", "地点"),
    employementStatus: pickString(obj, "employementStatus", "employmentStatus", "求职状态"),
    birthDate: pickString(obj, "birthDate", "birthday", "出生日期"),
    customFields: Array.isArray(obj.customFields) ? obj.customFields : [],
    photo: pickString(obj, "photo", "avatar", "头像"),
    githubKey: "",
    githubUseName: "",
    githubContributionsVisible: false,
  };
}

function parseDateRange(obj: any): string {
  const candidates = [
    pickString(obj, "date", "时间", "时间段", "dateRange", "period", "duration", "起止时间", "在职时间"),
    [pickString(obj, "startDate", "startTime", "beginTime", "开始时间"), pickString(obj, "endDate", "endTime", "结束时间")].filter(Boolean).join(" - "),
  ];
  return candidates.find(Boolean) ?? "";
}

function buildDescriptionWithFallback(
  obj: any,
  primaryCandidates: (string | string[])[],
  usedKeys: Set<string>
): string {
  const primaryItems: string[] = [];
  for (const c of primaryCandidates) {
    if (Array.isArray(c)) {
      primaryItems.push(...c.map(String));
    } else if (c) {
      primaryItems.push(c);
    }
  }
  const remaining = collectAllRemainingStrings(obj, usedKeys);
  const allItems = [...primaryItems, ...remaining].filter(Boolean);
  return allItems.length > 0 ? toListHtml(allItems) : "";
}

function mapProjectItem(item: any): any {
  const name = pickString(item, "name", "项目名称", "projectName", "title", "项目");
  const role = pickString(item, "role", "角色", "myRole", "my_role", "职责", "担任角色");
  const date = parseDateRange(item);
  const link = pickString(item, "link", "url", "链接", "地址", "projectUrl");
  const linkLabel = pickString(item, "linkLabel", "linkText");

  const usedKeys = new Set([
    "id", "visible", "name", "项目名称", "projectName", "title", "项目",
    "role", "角色", "myRole", "my_role", "职责", "担任角色",
    "date", "时间", "时间段", "dateRange", "period", "起止时间",
    "startDate", "startTime", "endDate", "endTime",
    "link", "url", "链接", "地址", "projectUrl",
    "linkLabel", "linkText",
  ]);

  const description = buildDescriptionWithFallback(item, [
    ...(Array.isArray(item["技术亮点"]) ? item["技术亮点"] : []),
    ...(Array.isArray(item["核心工作"]) ? item["核心工作"] : (item["核心工作"] ? [item["核心工作"]] : [])),
    ...(Array.isArray(item["项目描述"]) ? item["项目描述"] : (item["项目描述"] ? [item["项目描述"]] : [])),
    ...(Array.isArray(item["项目场景"]) ? item["项目场景"] : (item["项目场景"] ? [item["项目场景"]] : [])),
    ...(Array.isArray(item["技术栈"]) ? [`技术栈：${(item["技术栈"]).join("、")}`] : []),
    ...(Array.isArray(item["highlights"]) ? item["highlights"] : []),
    ...(Array.isArray(item["description"]) ? item["description"] : (item["description"] ? [item["description"]] : [])),
    ...(Array.isArray(item["details"]) ? item["details"] : []),
    ...(Array.isArray(item["detail"]) ? item["detail"] : []),
    ...(typeof item["描述"] === "string" ? [item["描述"]] : []),
    ...(typeof item["详情"] === "string" ? [item["详情"]] : []),
    ...(typeof item["summary"] === "string" ? [item["summary"]] : []),
    ...(typeof item["intro"] === "string" ? [item["intro"]] : []),
    ...(typeof item["introduction"] === "string" ? [item["introduction"]] : []),
    ...(typeof item["achievement"] === "string" ? [item["achievement"]] : []),
    ...(typeof item["content"] === "string" ? [item["content"]] : []),
  ], usedKeys);

  return { id: generateUUID(), name, role, date, description, link, linkLabel, visible: true };
}

function mapExperienceItem(item: any): any {
  const company = pickString(item, "company", "companyName", "organization", "employer", "公司", "公司名称", "单位", "企业", "org");
  const position = pickString(item, "position", "title", "role", "post", "jobTitle", "jobName", "职位", "岗位", "职务");
  const date = parseDateRange(item);

  const usedKeys = new Set([
    "id", "visible", "company", "companyName", "organization", "employer", "公司", "公司名称", "单位", "企业", "org",
    "position", "title", "role", "post", "jobTitle", "jobName", "职位", "岗位", "职务",
    "date", "时间", "时间段", "dateRange", "period", "起止时间",
    "startDate", "startTime", "beginTime", "endDate", "endTime",
  ]);

  const details = buildDescriptionWithFallback(item, [
    ...(Array.isArray(item["核心工作"]) ? item["核心工作"] : (item["核心工作"] ? [item["核心工作"]] : [])),
    ...(Array.isArray(item["技术亮点"]) ? item["技术亮点"] : []),
    ...(Array.isArray(item["工作内容"]) ? item["工作内容"] : (item["工作内容"] ? [item["工作内容"]] : [])),
    ...(Array.isArray(item["主要职责"]) ? item["主要职责"] : []),
    ...(Array.isArray(item["业绩成果"]) ? item["业绩成果"] : []),
    ...(Array.isArray(item["achievements"]) ? item["achievements"] : []),
    ...(Array.isArray(item["responsibilities"]) ? item["responsibilities"] : []),
    ...(Array.isArray(item["details"]) ? item["details"] : []),
    ...(Array.isArray(item["detail"]) ? item["detail"] : []),
    ...(typeof item["描述"] === "string" ? [item["描述"]] : []),
    ...(typeof item["详情"] === "string" ? [item["详情"]] : []),
    ...(typeof item["description"] === "string" ? [item["description"]] : []),
    ...(typeof item["summary"] === "string" ? [item["summary"]] : []),
    ...(typeof item["content"] === "string" ? [item["content"]] : []),
    ...(typeof item["workDescription"] === "string" ? [item["workDescription"]] : []),
    ...(typeof item["jobDescription"] === "string" ? [item["jobDescription"]] : []),
    ...(typeof item["performance"] === "string" ? [item["performance"]] : []),
    ...(typeof item["workContent"] === "string" ? [item["workContent"]] : []),
    ...(typeof item["highlights"] === "string" ? [item["highlights"]] : []),
  ], usedKeys);

  return { id: generateUUID(), company, position, date, details, visible: true };
}

function mapEducationItem(item: any): any {
  const school = pickString(item, "school", "schoolName", "name", "institution", "学校", "院校", "学校名称", "毕业院校");
  const major = pickString(item, "major", "speciality", "field", "专业", "专业名称", "所学专业");
  const degree = pickString(item, "degree", "educationBackground", "学历", "学位", "学历层次", "qualification");
  const startDate = pickString(item, "startDate", "startTime", "beginTime", "start", "from", "开始时间", "入学时间");
  const endDate = pickString(item, "endDate", "endTime", "end", "to", "结束时间", "毕业时间");

  let dateRange = "";
  if (!startDate && !endDate) {
    const rawRange = pickString(item, "date", "时间", "时间段", "起止时间");
    if (rawRange) {
      const parts = rawRange.split(/[-～~至]/);
      dateRange = parts[0]?.trim() ?? "";
    }
  }

  const usedKeys = new Set([
    "id", "visible", "school", "schoolName", "name", "institution", "学校", "院校", "学校名称",
    "major", "speciality", "field", "专业", "专业名称",
    "degree", "educationBackground", "学历", "学位", "学历层次",
    "date", "时间", "时间段", "起止时间",
    "startDate", "startTime", "beginTime", "start", "from", "开始时间", "入学时间",
    "endDate", "endTime", "end", "to", "结束时间", "毕业时间",
    "gpa", "score", "grade",
  ]);

  const description = buildDescriptionWithFallback(item, [
    ...(Array.isArray(item["主修课程"]) ? item["主修课程"] : []),
    ...(Array.isArray(item["courses"]) ? item["courses"] : []),
    ...(Array.isArray(item["课程"]) ? item["课程"] : []),
    ...(typeof item["description"] === "string" ? [item["description"]] : []),
    ...(typeof item["detail"] === "string" ? [item["detail"]] : []),
    ...(typeof item["summary"] === "string" ? [item["summary"]] : []),
    ...(typeof item["简介"] === "string" ? [item["简介"]] : []),
    ...(typeof item["说明"] === "string" ? [item["说明"]] : []),
  ], usedKeys);

  return {
    id: generateUUID(),
    school,
    major,
    degree,
    startDate: startDate || dateRange,
    endDate,
    gpa: pickString(item, "gpa", "score", "grade"),
    description,
    visible: true,
  };
}

function resolveArrayField(data: any, ...keys: string[]): any[] {
  for (const key of keys) {
    const val = data?.[key];
    if (Array.isArray(val)) return val;
    if (val && typeof val === "object" && !Array.isArray(val)) return [val];
  }
  return [];
}

function resolveSkills(data: any, advantageStr?: string): string {
  const skillSources = [
    data.skillContent, data.skills, data.skillList, data.skill,
    data.technicalSkills, data.techStack,
    data["专业技能"], data["技能"], data["技术栈"],
  ];

  for (let i = 0; i < skillSources.length; i++) {
    const raw = skillSources[i];
    if (!raw) continue;
    if (typeof raw === "string" && raw.trim()) return toListHtml(raw);
    if (Array.isArray(raw)) {
      if (raw.length === 0) continue;
      if (typeof raw[0] === "string") return toListHtml(raw);
      const names = raw.map((s: any) => s.name ?? s.skillName ?? s.label ?? s.text ?? s).filter(Boolean);
      if (names.length > 0) return toListHtml(names);
      const items: string[] = [];
      for (const item of raw) {
        if (item && typeof item === "object") {
          for (const [cat, vals] of Object.entries(item)) {
            if (Array.isArray(vals)) items.push(...vals.map((v: string) => `${cat}：${toString(v)}`));
            else if (typeof vals === "string" || typeof vals === "number") items.push(`${cat}：${toString(vals)}`);
          }
        } else if (typeof item === "string") {
          items.push(item);
        }
      }
      if (items.length > 0) {
        let html = advantageStr ? `<p>${escapeHtml(advantageStr)}</p>` : "";
        html += toListHtml(items);
        return html;
      }
      continue;
    }
    if (typeof raw === "object" && !Array.isArray(raw)) {
      const entries = Object.entries(raw);
      if (entries.length === 0) continue;
      const items: string[] = [];
      for (const [cat, vals] of entries) {
        if (Array.isArray(vals)) items.push(...vals.map((s: string) => `${cat}：${toString(s)}`));
        else if (typeof vals === "string") items.push(`${cat}：${vals}`);
      }
      if (items.length > 0) {
        let html = advantageStr ? `<p>${escapeHtml(advantageStr)}</p>` : "";
        html += toListHtml(items);
        return html;
      }
    }
  }
  return advantageStr ? `<p>${escapeHtml(advantageStr)}</p>` : "";
}

function resolveAdvantage(data: any): string {
  const raw = data["个人优势"] ?? data["自我评价"] ?? data["自我介绍"] ?? data["个人简介"]
    ?? data.advantages ?? data.self_evaluation ?? data.selfEvaluation
    ?? data.personal_advantage ?? data.summary ?? "";
  if (Array.isArray(raw)) return raw.map(String).join(" ");
  return toString(raw);
}

function doUniversalMap(data: Record<string, any>): Record<string, any> {
  const basicSrc = data.basic_info ?? data.basicInfo ?? data.basic ?? data.profile ?? data.personal ?? data.info ?? data["基本信息"] ?? {};
  const title = pickString(data, "title", "name", "标题", "简历标题", "resumeTitle")
    || pickString(basicSrc, "求职岗位", "期望职位", "job_title", "jobTitle", "position", "title");

  const projectsRaw = resolveArrayField(data, "projects", "projectList", "项目经历", "项目经验", "projectExperience");
  const experienceRaw = resolveArrayField(data, "experience", "experiences", "workList", "workHistory", "workExperience", "jobs", "career", "work_experience", "workExperience", "工作经历", "工作经验", "职业经历");
  const educationRaw = resolveArrayField(data, "education", "educations", "eduList", "eduExpList", "schools", "教育经历", "教育背景", "学历");

  const rawSkills = data.skills ?? data.skillContent ?? data["专业技能"] ?? data["技能"] ?? null;
  console.log("[JSON Import] [doUniversalMap] rawSkills type:", typeof rawSkills, "isArray:", Array.isArray(rawSkills));
  if (rawSkills != null) {
    console.log("[JSON Import] [doUniversalMap] rawSkills keys:", Array.isArray(rawSkills) ? `array len=${rawSkills.length}` : Object.keys(rawSkills).join(","));
    if (Array.isArray(rawSkills) && rawSkills.length > 0) {
      console.log("[JSON Import] [doUniversalMap] rawSkills[0]:", JSON.stringify(rawSkills[0]).substring(0, 200));
    }
  }
  let skillContent = "";
  if (rawSkills && typeof rawSkills === "string" && rawSkills.trim()) {
    skillContent = toListHtml(rawSkills);
  } else if (rawSkills && typeof rawSkills === "object" && !Array.isArray(rawSkills)) {
    const items: string[] = [];
    for (const [cat, vals] of Object.entries(rawSkills)) {
      if (Array.isArray(vals)) items.push(...vals.map((v: any) => `${cat}：${toString(v)}`));
      else if (typeof vals === "string") items.push(`${cat}：${vals}`);
    }
    skillContent = items.length > 0 ? toListHtml(items) : "";
  } else if (Array.isArray(rawSkills)) {
    const items: string[] = [];
    for (const item of rawSkills) {
      if (!item) continue;
      if (typeof item === "string") { items.push(item); continue; }
      if (typeof item !== "object") { items.push(String(item)); continue; }
      for (const [k, v] of Object.entries(item)) {
        if (Array.isArray(v)) items.push(...v.map((x: any) => `${k}：${toString(x)}`));
        else items.push(`${k}：${toString(v)}`);
      }
    }
    console.log("[JSON Import] [doUniversalMap] inline skill items count:", items.length);
    if (items.length > 0) skillContent = toListHtml(items);
  }

  const advantage = resolveAdvantage(data);
  if (advantage && !skillContent.startsWith("<p>")) {
    skillContent = `<p>${escapeHtml(advantage)}</p>${skillContent}`;
  } else if (advantage) {
    skillContent = `<p>${escapeHtml(advantage)}</p>`;
  }
  console.log("[JSON Import] [doUniversalMap] final skillContent length:", skillContent.length);

  return {
    title,
    basic: extractBasic(basicSrc),
    education: educationRaw.map(mapEducationItem),
    experience: experienceRaw.map(mapExperienceItem),
    projects: projectsRaw.map(mapProjectItem),
    skillContent,
  };
}

export const mapExternalResumeJson = (rawData: any): Record<string, any> | null => {
  if (!rawData || typeof rawData !== "object" || Array.isArray(rawData)) return null;

  const format = detectResumeFormat(rawData);

  switch (format) {
    case "native": return rawData;
    default: return doUniversalMap(rawData);
  }
};

export const createResumeFromAIResult = (result: any, fileName: string) => {
  const now = new Date().toISOString();
  const id = generateUUID();

  const education = Array.isArray(result?.education) ? result.education : [];
  const experience = Array.isArray(result?.experience) ? result.experience : [];
  const projects = Array.isArray(result?.projects) ? result.projects : [];

  const skillSource = result?.skillContent ?? result?.skills;
  const skillContent = toListHtml(skillSource);

  return {
    ...initialResumeState,
    id,
    title: toString(result?.title) || fileName || `Imported Resume ${id.slice(0, 6)}`,
    createdAt: now,
    updatedAt: now,
    templateId: DEFAULT_TEMPLATES[0]?.id,
    basic: {
      ...initialResumeState.basic,
      name: toString(result?.basic?.name),
      title: toString(result?.basic?.title),
      email: toString(result?.basic?.email),
      phone: toString(result?.basic?.phone),
      location: toString(result?.basic?.location),
      employementStatus: toString(result?.basic?.employementStatus),
      birthDate: toString(result?.basic?.birthDate),
      customFields: [],
      photo: "",
      githubKey: "",
      githubUseName: "",
      githubContributionsVisible: false,
    },
    education: education
      .map((item: any) => ({
        id: generateUUID(),
        school: toString(item?.school),
        major: toString(item?.major),
        degree: toString(item?.degree),
        startDate: toString(item?.startDate),
        endDate: toString(item?.endDate),
        gpa: toString(item?.gpa),
        description: toListHtml(item?.description),
        visible: true,
      }))
      .filter((item: any) => item.school || item.major || item.degree),
    experience: experience
      .map((item: any) => ({
        id: generateUUID(),
        company: toString(item?.company),
        position: toString(item?.position),
        date: toString(item?.date),
        details: toListHtml(item?.details || item?.description),
        visible: true,
      }))
      .filter((item: any) => item.company || item.position || item.date || item.details),
    projects: projects
      .map((item: any) => ({
        id: generateUUID(),
        name: toString(item?.name),
        role: toString(item?.role),
        date: toString(item?.date),
        description: toListHtml(item?.description || item?.details),
        link: toString(item?.link),
        linkLabel: toString(
          item?.linkLabel ??
            item?.linkText ??
            item?.displayText ??
            item?.linkDisplayText
        ),
        visible: true,
      }))
      .filter((item: any) => item.name || item.role || item.date || item.description),
    skillContent,
    customData: {},
  };
};
