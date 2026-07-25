export type AuthResponse = {
  accessToken: string;
  username: string;
};

export type Project = {
  projectId: string;
  name: string;
  language: string;
  createdAt: string;
  updatedAt: string;
};

export type UserProfile = {
  userId: string;
  username: string;
  email: string;
  createdAt: string;
};

export type FileNode = {
  name: string;
  path: string;
  type: "file" | "directory";
  children: FileNode[];
};
