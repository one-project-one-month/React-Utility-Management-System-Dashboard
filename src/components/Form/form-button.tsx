import { Button } from "@heroui/react";

type FormButtonProps = {
    children: React.ReactNode
    type: 'button' | 'submit'
    isLoading?: boolean
}

const FormButton = ({ children, type, isLoading }: FormButtonProps) => {
    return (
        <Button type={type} color="primary" isLoading={isLoading}>
            {children}
        </Button>
    );
};

export default FormButton;