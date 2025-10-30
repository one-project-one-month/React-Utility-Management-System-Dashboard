import {useNavigate, useParams} from "react-router";
import {roleColors, roleLabels} from "@/constants/userMockData.ts";

type UserRole = keyof typeof roleColors;

interface User {
    userName: string;
    email: string;
    role: UserRole;
    isActive: boolean;
}
import {Button, Card, CardBody, Chip} from "@heroui/react";
import {breadcrumbs} from "@/constants/breadcrumbs.ts";
import NavigationBreadCrumbs from "@/components/breadcrumb.tsx";
import {LoadingSpinner} from "@/components/Room/loading-spinner.tsx";
import {useFetchUser} from "@/hooks/useUsers.ts";
import {Pencil} from "lucide-react";

export default function UserDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();

    const { data: user, isLoading } = useFetchUser(id!) as { data: User | undefined, isLoading: boolean };

    if (isLoading) {
        return (
            <LoadingSpinner />
        );
    }

    if (!user) {
        return (
            <div className="p-8">
                <div className="text-center">
                    <h1 className="text-2xl font-medium mb-4">User Not Found</h1>
                    <Button onPress={() => navigate('/user-management/users')}>
                        Back to Users
                    </Button>
                </div>
            </div>
        )
    }

    const handleEditUser = () => {
        navigate(`/user-management/users/${id}/edit`)
    }

    return (
        <div className={"p-2 space-y-4"}>
            <NavigationBreadCrumbs items={breadcrumbs.userDetail} />

            <div className={"space-y-2 pb-12"}>
                <div className={"grid grid-cols-1 gap-6 items-start"}>
                    <Card className={"shadow-none p-4"}>
                        <CardBody>
                            <div className={"flex justify-between items-center"}>
                                <div className={"space-y-4"}>
                                    <div className={"flex items-center gap-4"}>
                                        <h3 className={"text-2xl font-medium"}>{user.userName}</h3>

                                        <div className={"flex gap-2"}>
                                            <Chip className={roleColors[user.role]}>
                                                {roleLabels[user.role]}
                                            </Chip>
                                            <Chip color={user.isActive ? "success" : "default"} className={"text-white"}>
                                                {user.isActive ? "Active" : "Inactive"}
                                            </Chip>
                                        </div>
                                    </div>
                                    <p className={"text-gray-500"}>{user.email}</p>
                                </div>

                                <div>
                                    <Button
                                        isIconOnly
                                        onPress={handleEditUser}
                                        variant={"light"}
                                        color={"primary"}
                                    >
                                        <Pencil size={24} className={"text-primary"} />
                                    </Button>
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                </div>

            </div>
        </div>
    )
}