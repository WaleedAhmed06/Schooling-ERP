"use client";
import { announcements } from "@/data/seeds/dashboard";
import { useTeacherData } from "../../hooks/useTeacherData";
import { TeacherPageFrame, TeacherPanel } from "../TeacherPageFrame";
import { ParentInbox } from "./ParentInbox";
import { AnnouncementForm } from "./AnnouncementForm";
export function CommunicationPage() {
  const { data } = useTeacherData();
  return (
    <TeacherPageFrame
      title="Communication"
      description="Messages, announcements and school notifications."
    >
      <TeacherPanel title="Parent Messages">
        <ParentInbox />
        {data.messages.map((m) => (
          <article className="teacher-record" key={m.id}>
            <strong>
              {m.parentName} · {m.studentName}
            </strong>
            <p>{m.body}</p>
          </article>
        ))}
      </TeacherPanel>
      <TeacherPanel title="Create Announcement">
        <AnnouncementForm />
        {data.notices.map((n) => (
          <p key={n.id}>
            <strong>{n.title}</strong> · {n.audience}: {n.body}
          </p>
        ))}
      </TeacherPanel>
      <TeacherPanel title="School Notifications">
        {announcements
          .filter((n) => n.audience.includes("teacher"))
          .map((n) => (
            <p key={n.id}>
              <strong>{n.title}</strong> · {n.description}
            </p>
          ))}
      </TeacherPanel>
    </TeacherPageFrame>
  );
}
