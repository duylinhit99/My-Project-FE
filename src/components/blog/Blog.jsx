import { useEffect, useState } from 'react';
import api from '../../api';
import API_URL from '../../api/API_URL';
import { Link } from 'react-router-dom';
function Blog() {
  const [dataBlog, setDataBlog] = useState([]);

  useEffect(() => {
    api
      .get(API_URL.BLOG)
      .then((res) => {
        setDataBlog(res.data.blog.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const renderBlog = () => {
    if (dataBlog.length > 0) {
      return dataBlog.map((item, index) => {
        return (
          <div className="single-blog-post" key={index}>
            <h3>{item.title}</h3>
            <div className="post-meta">
              <ul>
                <li>
                  <i className="fa fa-user"></i> Mac Doe
                </li>
                <li>
                  <i className="fa fa-clock-o"></i> 1:33 pm
                </li>
                <li>
                  <i className="fa fa-calendar"></i> DEC 5, 2013
                </li>
              </ul>
              <span>
                <i className="fa fa-star"></i>
                <i className="fa fa-star"></i>
                <i className="fa fa-star"></i>
                <i className="fa fa-star"></i>
                <i className="fa fa-star-half-o"></i>
              </span>
            </div>
            <a href="">
              <img
                src={
                  'http://localhost/laravel8/public/upload/Blog/image/' +
                  item.image
                }
                alt=""
              />
            </a>
            <p>{item.content}</p>
            <Link className="btn btn-primary" to={`/blog/detail/${item.id}`}>
              Read More
            </Link>
          </div>
        );
      });
    }
  };
  return (
    <div className="col-sm-9">
      <div className="blog-post-area">
        <h2 className="title text-center">Latest From our Blog</h2>
        {renderBlog()}
        <div className="pagination-area">
          <ul className="pagination">
            <li>
              <a href="" className="active">
                1
              </a>
            </li>
            <li>
              <a href="">2</a>
            </li>
            <li>
              <a href="">3</a>
            </li>
            <li>
              <a href="">
                <i className="fa fa-angle-double-right"></i>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Blog;
