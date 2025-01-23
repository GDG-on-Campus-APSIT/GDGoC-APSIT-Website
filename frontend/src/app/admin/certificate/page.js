import {Cert, CertificateManagementPage} from "@/components/certificate-management";
import {NavbarComponent} from "@/components/navbar";
import { LeaderboardView } from "@/components/recognition-page";

export default function CertificatePage() {
  return (
    <>
      <NavbarComponent/>
      <Cert />
    </>
  )
}