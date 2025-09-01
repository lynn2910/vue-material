export type ButtonVariant = 'icon' | 'fab';

export interface BaseButton {
  variant: ButtonVariant;
  onClick: () => void;
  disabled?: boolean;
}

export interface IconButton extends BaseButton {
  icon: string;
}

export type ToolbarTheme = "standard" | "vibrant";

export type ToolbarItem = IconButton;

export type ToolbarLayout = 'vertical' | 'horizontal';
