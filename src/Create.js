import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Create = () => {

    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [author, setAurthor] = useState("mario");
    const [isPending, setIsPending] = useState(false);
    const history = useNavigate();

    const handleSubmit = e => {
        e.preventDefault();
        const blog = { title, body, author };

        setIsPending(true);

        fetch('http://localhost:8000/blogs', {
            method: 'POST',
            headers: { 'Content-Type': "application/json" },
            body: JSON.stringify(blog)
        }).then(() => {
            setIsPending(false);
            console.log("New blog added");
        });

        history("/");

    };

    return (
        <div className="create">
            <h2>Add a New Blog</h2>
            <form onSubmit={handleSubmit}>
                <label>Blog title:</label>
                <input type="text" required value={title} onChange={e => setTitle(e.target.value)} />
                <label>Blog body:</label>
                <textarea required value={body} onChange={e => setBody(e.target.value)} />
                <label>Blog author:</label>
                <select value={author} onChange={e => setAurthor(e.target.value)}>
                    <option value="mario">mario</option>
                    <option value="yoshi">yoshi</option>
                </select>
                <button disabled={isPending}>Add Blog</button>
            </form>
        </div>
    );
}

export default Create;