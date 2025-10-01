import { useState, useEffect } from 'react';
import StarRatings from 'react-star-ratings';
import api from '../../api';
import API_URL from '../../api/API_URL';
import { toast } from 'react-toastify';
function Rate(props) {
  const [rating, setRating] = useState(0);
  const [totalRates, setTotalRates] = useState(0); // Theo dõi tổng số lượt đánh giá
  const [userRating, setUserRating] = useState(null); // Lưu rating của người dùng nếu có
  const { id } = props;

  // api lay so luong rating - tinh tb
  useEffect(() => {
    api
      .get(API_URL.BLOG_RATE + id)
      .then((res) => {
        if (res.data.data && Array.isArray(res.data.data)) {
          const { data } = res.data;
          let tongRate = data.reduce((sum, val) => sum + val.rate, 0);
          let tbcRate = tongRate / data.length;
          setRating(tbcRate);
          setTotalRates(data.length); // cap nhat tong so luong danh gia

          // kiem tra neu user da danh gia truoc do
          const dataUser = JSON.parse(localStorage.getItem('auth'));
          const userPreviousRating = data.find(
            (r) => r.user_id === dataUser.id
          );
          if (userPreviousRating) {
            setUserRating(userPreviousRating.rate);
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const changeRating = (newRating) => {
    // check co login chua
    if (!localStorage.getItem('login')) {
      toast.error('Ban chua login');
      return;
    }

    // lấy rate cũ đã được nhập trước đó của user
    const previousUserRating = userRating; // giu lai so sao ma user da danh gia truoc do
    const newTotalRates = userRating ? totalRates : totalRates + 1;

    // tinh rate trung binh moi
    const newAvgRating = userRating
      ? (rating * totalRates - previousUserRating + newRating) / totalRates
      : (rating * totalRates + newRating) / newTotalRates;

    // cap nhat state moi
    setRating(newAvgRating);
    setTotalRates(newTotalRates);
    setUserRating(newRating);

    // kiem tra du lieu der gui api
    const dataUser = JSON.parse(localStorage.getItem('auth'));
    const accessToken = JSON.parse(localStorage.getItem('token'));

    let config = {
      headers: {
        Authorization: 'Bearer ' + accessToken,
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
      },
    };

    const formData = new FormData();
    formData.append('user_id', dataUser.id);
    formData.append('blog_id', id);
    formData.append('rate', newRating);

    api.post(API_URL.BLOG_RATE + id, formData, config);
  };

  return (
    <StarRatings
      rating={rating || 0} // Đảm bảo rằng rating không phải là undefined
      starRatedColor="blue"
      changeRating={changeRating}
      numberOfStars={5}
      name="rating"
    />
  );
}

export default Rate;
