
export type ButtonTypes = {
    children: React.ReactNode;
    onClick?: () => void;
    type: 'button' | 'submit' | 'reset';
    disabled?: boolean;
    variant?: 'primary' | 'secondary';
    size?: 'sm' | 'md' | 'lg';
    className?: string;
}