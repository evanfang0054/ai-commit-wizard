declare module 'gradient-string' {
  interface GradientString {
    pastel: {
      multiline(text: string): string;
    };
  }
  const gradient: GradientString;
  export default gradient;
} 