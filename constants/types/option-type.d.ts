export {};

declare global {
  type OptionType<T> = {
    [P in keyof T]?: T[P] extends object ? OptionType<T[P]> : T[P];
  };

  type TextStyle = {
    title: string;
    subtitle: string;
    body: string;
    caption: string;
  };

  type CardStyle = {
    gap: string;
    padding: string;
    margin: string;
    borderRadius: string;
    shadow: string;
  };

  type Size = 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';
}
