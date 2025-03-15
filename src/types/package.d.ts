declare module '*/package.json' {
  interface PackageJson {
    name: string;
    version: string;
    [key: string]: any;
  }
  const value: PackageJson;
  export default value;
} 