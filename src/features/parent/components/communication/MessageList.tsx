import type { ParentMessage } from "../../types/parent.types";
export function MessageList({ messages }: { messages: ParentMessage[] }) {
  return (
    <>
      {messages.length === 0 && <p>No messages yet.</p>}
      {messages.map((m) => (
        <article className="parent-record" key={m.id}>
          <strong>
            {m.from} · {m.to}
          </strong>
          <p>{m.body}</p>
          <small>{m.createdAt}</small>
        </article>
      ))}
    </>
  );
}
