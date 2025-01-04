import Certificate from '@/components/certificate'
import { NavbarComponent } from '@/components/navbar';

export default function CertificatePage() {
  return (
    <>
      <NavbarComponent />
      <Certificate
        recipientName="John Doe"
        courseName="Advanced React Development"
        date="June 15, 2023"
        signatureName="Dr. Jane Smith" />
    </>
  );
}

