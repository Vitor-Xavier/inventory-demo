import { ReactNode } from "react";

export type MenuItem = {
    key: string;
    name: string;
    icon: ReactNode;
    route: string;
};
