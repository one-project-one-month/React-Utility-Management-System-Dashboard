import { Button } from "@heroui/react"
import { useNavigate } from "react-router";

const FormCancelButton = () => {
    const navigate = useNavigate();
    return (
        <Button variant="bordered" color="default" onPress={() => navigate(-1)}>
            Cancel
        </Button>
    )
}

export default FormCancelButton