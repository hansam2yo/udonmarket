import { useEffect, useState } from "react";
import { useFirestore } from "../../hooks/useFirestore";

export default function DiaryForm({ uid }) {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const { addDocument, response } = useFirestore("diary");

  const handleData = (event) => {
    if (event.target.id === "tit") {
      setTitle(event.target.value);
    } else if (event.target.id === "txt") {
      setText(event.target.value);
    }
  };

  useEffect(() => {
    if (response.success) {
      console.log(response);
      setTitle("");
      setText("");
    }
  }, [response.success]); // [response.success가 바뀔 때만 effect를 재실행합니다.](https://ko.reactjs.org/docs/hooks-effect.html#tip-optimizing-performance-by-skipping-effects)

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(title, text);
    addDocument({ uid, title, text });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>일기 쓰기</legend>
          <label htmlFor="tit">일기 제목 : </label>
          <input
            id="tit"
            type="text"
            required
            onChange={handleData}
            value={title}
          />

          <label htmlFor="txt">일기 내용 : </label>
          <textarea
            id="txt"
            type="text"
            required
            onChange={handleData}
            value={text}
          ></textarea>

          <button type="submit">저장하기</button>
        </fieldset>
      </form>
    </>
  );
}
