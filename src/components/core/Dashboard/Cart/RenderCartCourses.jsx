import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ReactStars from 'react-stars';
import { RiStarSLine } from "react-icons/ri";
import { RiStarSFill } from "react-icons/ri";
import { RiDeleteBin5Line } from "react-icons/ri";
import { removeFromCart } from '../../../../slices/cartSlice';



const RenderCartCourses = () => {

    const {cart} = useSelector((state) => state.cart);
    const dispatch = useDispatch();
  return (
    <div>
      {cart.map((course, index) => (
        <div>
          <div>
            <img src={course.thumbnail} alt="" />
            <div>
              <p>{course?.courseName}</p>
              <p>{course?.category?.name}</p>
              <div>
                <span>4.8</span>
                <ReactStars
                  count={5}
                  size={20}
                  edit={false}
                  activeColor="#ffd700"
                  emptyIcon={<RiStarSLine />}
                  fullIcon={<RiStarSFill />}
                />
                <span>{course?.ratingAndReviews?.length} Ratings</span>
              </div>
            </div>
          </div>
          <div>
            <button
               onClick={() => dispatch(removeFromCart(course._id))}
            >
              <RiDeleteBin5Line />
              <span>Remove</span>
            </button>

            <p>{course?.price}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default RenderCartCourses
