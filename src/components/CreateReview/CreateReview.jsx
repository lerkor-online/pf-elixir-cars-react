import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";
import { useParams } from "react-router-dom";

const CreateReview = () => {
  const [rating, setRating] = useState(1);
  const [reviewText, setReviewText] = useState("");
  const { carId } = useParams();
  const { user } = useAuth0();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(user);
    let userId = user.id;
    const review = {
      comment: reviewText,
      rate: rating,
      carId,
      userId,
    };
    console.log(review);
    try {
      //   const response = await createReview(review);
      alert("Review created successfully");
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  return (
    <form>
      <div className="form-group">
        <label htmlFor="exampleFormControlSelect1">Qualification</label>
        <select
          className="form-control"
          id="exampleFormControlSelect1"
          name="rating"
          value={rating}
          onChange={(e) => setRating(parseInt(e.target.value))}
        >
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="exampleFormControlSelect2"></label>
      </div>
      <div className="form-group">
        <label htmlFor="exampleFormControlTextarea1">
          What do you think about it?
        </label>
        <textarea
          className="form-control"
          id="exampleFormControlTextarea1"
          rows="2"
          name="review-text"
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
        ></textarea>
      </div>
      <button type="submit" onClick={handleSubmit}>
        Enviar
      </button>
    </form>
  );
};

export default CreateReview;
