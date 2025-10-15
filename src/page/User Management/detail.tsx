import {useNavigate, useParams} from "react-router";
import {roleColors, roleLabels, userDetailMockData} from "@/constants/userMockData.ts";
import {Button, Card, CardBody, CardHeader, Chip} from "@heroui/react";
import {breadcrumbs} from "@/constants/breadcrumbs.ts";
import NavigationBreadCrumbs from "@/components/breadcrumb.tsx";
import {InfoRow} from "@/components/common/info-row.tsx";
import {Pencil, Trash2} from "lucide-react";

export default function RoomDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();

    const user = userDetailMockData.find(u => u.id == id);

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
            <div className={"flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"}>
                <div className={"flex items-center gap-2"}>
                    <h1 className={"text-2xl font-medium"}>User Detail</h1>
                </div>

                <div className={"flex gap-2"}>
                    <Button
                        onPress={handleEditUser}
                        variant={"bordered"}
                        className={"border-[0.5px] bg-white dark:text-black"}
                        startContent={<Pencil size={16} />}
                    >
                        Edit
                    </Button>
                    <Button
                        variant={"bordered"}
                        className={"border-[0.5px] text-red-500 bg-white"}
                        startContent={<Trash2 size={16} />}
                    >
                        Delete
                    </Button>
                </div>
            </div>

            <div className={"space-y-2 pb-12"}>
                <div className={"grid grid-cols-1 lg:grid-cols-2 gap-6 items-start"}>
                    <Card className={"shadow-none p-2"}>
                        <CardBody>
                            <div className={"flex justify-between items-center gap-4 mb-6"}>
                                <div className={"space-y-1"}>
                                    <h3 className={"text-2xl font-medium"}>{user.userName}</h3>
                                    <p className={"text-gray-500"}>{user.email}</p>
                                </div>
                                <div className={"flex gap-2"}>
                                    <Chip className={roleColors[user.role]}>
                                        {roleLabels[user.role]}
                                    </Chip>
                                    <Chip color={user.isActive ? "success" : "default"} className={"text-white"}>
                                        {user.isActive ? "Active" : "Inactive"}
                                    </Chip>
                                </div>
                            </div>

                            <InfoRow label={"Nrc"} value={user.nrc} noBorder />
                            <InfoRow label={"Room Number"} value={user.room} noBorder />
                            <InfoRow label={"Phone Number"} value={user.phNumber} noBorder />
                            <InfoRow label={"Emergency Number"} value={user.emergencyNo} noBorder />
                        </CardBody>
                    </Card>

                    <Card className={"shadow-none p-2"}>
                        <CardHeader className={"text-2xl font-medium"}>Account Information</CardHeader>
                        <CardBody>
                            <InfoRow label={"Created Date"} value={'5.7.2024'} noBorder />
                            <InfoRow label={"Last Login"} value={'10.10.2025'} noBorder />
                        </CardBody>
                    </Card>
                </div>

            </div>
        </div>
    )
}