import { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../../api';
import API_URL from '../../api/API_URL';

function Comment(props) {
  const { idBlog, getCmt, idCommentToRely } = props;

  const [getComment, setComment] = useState();
  const [error, setError] = useState({});

  const auth = JSON.parse(localStorage.getItem('auth'));
  const token = JSON.parse(localStorage.getItem('token'));
  const handleComment = (event) => {
    setComment(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let isCheck = true;

    const login = JSON.parse(localStorage.getItem('login'));

    if (!login) {
      toast.error('Ban chua login');
      isCheck = false;
      return;
    } else if (getComment === '') {
      isCheck = false;
      setError('Vui long nhap noi dung');
    }

    if (isCheck) {
      let config = {
        headers: {
          Authorization: 'Bearer ' + token,
          'Content-Type': 'application/x-www-form-urlencoded',
          Accept: 'application/json',
        },
      };

      if (getComment) {
        const formData = new FormData();

        formData.append('id_blog', idBlog);
        formData.append('id_user', auth.id);
        formData.append('name_user', auth.name);
        formData.append('image_user', auth.avatar);
        formData.append('comment', getComment);
        formData.append('id_comment', idCommentToRely ? idCommentToRely : 0);

        api
          .post(API_URL.BLOG_COMMENT + idBlog, formData, config)
          .then((res) => {
            if (res.data.data) {
              getCmt(res.data.data.comment);

              // reset comment
              setComment('');

              toast.success('Đăng bình luận thành công!');
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
  };
  return (
    <div className="replay-box">
      <div className="row">
        <div className="col-sm-12">
          <h2>Leave a replay</h2>

          <div className="text-area">
            <div className="blank-arrow">
              <label>Your Name</label>
            </div>
            <span>*</span>
            <textarea
              name="message"
              rows="11"
              value={getComment || ''}
              onChange={handleComment}
            ></textarea>
            <Link className="btn btn-primary" href="" onClick={handleSubmit}>
              post comment
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Comment;
