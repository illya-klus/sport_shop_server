export type User = {
    email : string;
    password : string;
}

export function isUser(obj: any): obj is User {
  return (
    obj &&
    typeof obj === "object" &&
    (typeof obj.id === "string" || typeof obj.id === "number") &&
    typeof obj.email === "string" &&
    typeof obj.role === "string" 
  );
}