import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Api from "../Api";

const BlogApp = () => {
  const { register, handleSubmit, reset } = useForm();
  const [blogs, setBlog] = useState([]);
  const [id, setId] = useState(null);
  const [image, setImage] = useState(null);

  async function Add(data) {
    const formData = new FormData();
    formData.append("b_title", data.b_title);
    formData.append("b_category", data.b_category);
    formData.append("b_desc", data.b_desc);
    if (data.b_image?.[0]) formData.append("b_image", data.b_image[0]);

    if (id === null) {
      await Api.post("/blog", formData);
      alert("Blog Added");
    } else {
      await Api.put(`/blog/?id=${id}`, formData);
      alert("Blog Updated");
      setId(null);
      setImage(null);
    }

    reset();
    showApi();
  }

  async function showApi() {
    const res = await Api.get("/blog");
    setBlog(res.data.records || []);
  }

  useEffect(() => {
    showApi();
  }, []);

  async function trash(id) {
    if (!confirm("Are you sure?")) return;
    await Api.delete(`/blog/${id}`);
    alert("Deleted");
    showApi();
  }

  function update(id) {
    setId(id);
    const singleBlog = blogs.find((blog) => blog._id === id);
    setImage(`${import.meta.env.VITE_IMAGE_URL}/${singleBlog.b_image}`);
    reset(singleBlog);
  }

  function formDate(date) {
    return new Date(date).toLocaleDateString();
  }

  return (
    <div className="container my-4">
      {/* HEADER */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="fw-bold">📄 Blog Management</h3>
        <span className="badge bg-primary">Total Blogs: {blogs.length}</span>
      </div>

      {/* FORM CARD */}
      <div className="card shadow mb-4">
        <div className="card-header bg-dark text-white">
          {id === null ? "Add New Blog" : "Update Blog"}
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit(Add)} encType="multipart/form-data">
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Title</label>
                <input
                  {...register("b_title")}
                  className="form-control"
                  required
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Category</label>
                <input
                  {...register("b_category")}
                  className="form-control"
                  required
                />
              </div>

              <div className="col-12 mb-3">
                <label className="form-label">Description</label>
                <textarea
                  {...register("b_desc")}
                  className="form-control"
                  rows="3"
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Image</label>
                <input
                  {...register("b_image")}
                  type="file"
                  className="form-control"
                  accept="image/*"
                />
              </div>

              {id !== null && image && (
                <div className="col-md-6 mb-3 text-center">
                  <label className="form-label">Preview</label>
                  <div>
                    <img
                      src={image}
                      alt=""
                      className="img-thumbnail"
                      width="120"
                    />
                  </div>
                </div>
              )}
            </div>

            <button className="btn btn-success w-100">
              {id === null ? "Save Blog" : "Update Blog"}
            </button>
          </form>
        </div>
      </div>

      {/* TABLE */}
      <div className="card shadow">
        <div className="card-header bg-secondary text-white">
          Blog List
        </div>
        <div className="table-responsive">
          <table className="table table-hover table-bordered align-middle mb-0">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Category</th>
                <th>Description</th>
                <th>Image</th>
                <th>Created</th>
                <th>Updated</th>
                <th width="160">Action</th>
              </tr>
            </thead>
            <tbody>
              {blogs.length === 0 ? (
                <tr>
                  <td colSpan="8" className="text-center text-muted">
                    No Blogs Found
                  </td>
                </tr>
              ) : (
                blogs.map((blog, index) => (
                  <tr key={blog._id}>
                    <td>{index + 1}</td>
                    <td>{blog.b_title}</td>
                    <td>
                      <span className="badge bg-info text-dark">
                        {blog.b_category}
                      </span>
                    </td>
                    <td>{blog.b_desc}</td>
                    <td>
                      {blog.b_image && (
                        <img
                          src={`${import.meta.env.VITE_IMAGE_URL}/${blog.b_image}`}
                          width="60"
                          className="rounded"
                        />
                      )}
                    </td>
                    <td>{formDate(blog.createdAt)}</td>
                    <td>{formDate(blog.updatedAt)}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-warning me-2"
                        onClick={() => update(blog._id)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => trash(blog._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BlogApp;
