import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Vender mi Auto | El Garage",
    description: "Consigna tu vehículo exótico con nosotros. Tasación profesional y máxima confidencialidad.",
};

export default function SellLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
