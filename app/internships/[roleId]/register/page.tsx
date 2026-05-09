"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useMemo } from "react";
import { SiteLayout } from "@/components/sections/Layout";
import { RegistrationForm } from "@/components/forms/RegistrationForm";
import { getInternshipById } from "@/lib/internships";

export default function RegistrationPage() {
  const { roleId } = useParams();
  const role = useMemo(() => {
    if (!roleId) return null;
    return getInternshipById(roleId as string);
  }, [roleId]);

  if (!role) return null;

  return (
    <SiteLayout>
      <RegistrationForm role={role} roleId={roleId as string} />
    </SiteLayout>
  );
}
