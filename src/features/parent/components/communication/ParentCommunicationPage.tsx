"use client";
import { useParentPortal } from "../../hooks/useParentPortal";
import { useTeacherRecords } from "../../hooks/useTeacherRecords";
import { ParentPage, ParentPanel } from "../shared/ParentPanel";
import { ChildSelector } from "../shared/ChildSelector";
import { MessageComposer } from "./MessageComposer";
import { MessageList } from "./MessageList";
import { SchoolAnnouncements } from "./SchoolAnnouncements";
export function ParentCommunicationPage() {
  const { child, data } = useParentPortal();
  const teacher = useTeacherRecords();
  return (
    <ParentPage
      title="Communication"
      description="School announcements, fee reminders and teacher messages."
    >
      <ChildSelector />
      <ParentPanel title="Contact Teacher">
        <MessageComposer studentId={child.id} />
        <p className="parent-disclaimer">
          Messages and teacher replies synchronize in this browser demo.
        </p>
      </ParentPanel>
      <ParentPanel title="Messages">
        <MessageList
          messages={data.messages.filter((m) => m.studentId === child.id)}
        />
      </ParentPanel>
      <ParentPanel title="School Announcements">
        <SchoolAnnouncements teacherNotices={teacher.notices} />
      </ParentPanel>
    </ParentPage>
  );
}
