import Certificate from '@/components/certificate';
import { NavbarComponent } from '@/components/navbar';

export default function CertificatePage() {
  return (
    <>
      <NavbarComponent />
      <Certificate
        recipientName="John Doe"
        courseName="Google Gen AI Study Jam 2024"
        date="20th January 2025"
        mentorName="Jishanahmed Shaikh"
        mentorTitle="Cloud Head of GDGoC APSIT"
        organizerName="Yash Agrawal"
        organizerTitle="Organizer of GDGoC APSIT"
        facultyName="Prof. Rushikesh Nikam"
        facultyTitle="Faculty Head of GDGoC APSIT"
        groupLogo="/GDG_logo_horizontal.png"
        mentorSignature="/jishan_sign.png"
        organizerSignature="/yash_sign.png"
        facultySignature="/sir_sign.png"
        verificationUrl="https://example.com/verify?certId=12345"
        description="In recognition of his/her hardwork and dedication shown in obtaining all the 15 skill badges and finishing 1 arcade of Google Gen AI Study Jam 2024, held by GDG On Campus APSIT"
      />
    </>
  );
}

