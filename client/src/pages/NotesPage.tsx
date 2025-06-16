import { useEffect, useState } from "react";
import axios from "../api/axios";
import { Form, Button, Card, ListGroup } from "react-bootstrap";

type Note = {
  _id: string;
  title: string;
  content: string;
};

export default function NotesPage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [msg, setMsg] = useState("");

  const fetchNotes = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get("/api/notes", {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("This is the token at the fetch notes call: ", token);
      setNotes(res.data);
    } catch (err: any) {
      setMsg("Failed to fetch notes.");
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    const token = localStorage.getItem("token");
    e.preventDefault();
    try {
      await axios.post(
        "/api/notes",
        { title, content },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTitle("");
      setContent("");
      fetchNotes();
    } catch (err: any) {
      setMsg("Failed to create note.");
    }
  };

  const handleDelete = async (id: string) => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(`api/notes/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchNotes();
    } catch (err: any) {
      setMsg("Failed to delete note.");
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div>
      <h2>Your Notes</h2>
      <Card className="mb-3">
        <Form onSubmit={handleCreate}>
          <Form.Group>
            <Card.Body>
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mb-3"
              />
              <Form.Label>Content</Form.Label>
              <Form.Control
                type="textarea"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="mb-3"
              />
              <Button variant="primary" type="submit" onClick={handleCreate}>Add Note</Button>
            </Card.Body>
          </Form.Group>
        </Form>
      </Card>
      {msg && <p>{msg}</p>}
      <ListGroup>
        {notes.map((note) => (
          <ListGroup.Item key={note._id} className="mb-3">
            <div className="row g-3">
              <div className="col-auto">
                <Form.Label>
                  <strong>{note.title}</strong>:
                </Form.Label>
                </div>
                <div className="col-auto">
                {note.content}
                </div>
                <div className="col-auto">
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(note._id)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
}
