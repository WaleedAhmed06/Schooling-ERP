import { students } from "@/data/seeds/dashboard";
export function StudentRoster({ ids }: { ids: string[] }) {
  const roster = students.filter((s) => ids.includes(s.id));
  return (
    <table className="teacher-table">
      <thead>
        <tr>
          <th>Student</th>
          <th>Roll Number</th>
          <th>Class</th>
        </tr>
      </thead>
      <tbody>
        {roster.map((s) => (
          <tr key={s.id}>
            <td>{s.name}</td>
            <td>{s.rollNumber}</td>
            <td>
              {s.className} – {s.section}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
