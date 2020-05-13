import React, { useState } from "react";

function Form() {
  const [data, setData] = useState({
    id: Date.now(),
    name: "",
    email: "",
    role: "",
  });



  return (
    <form>
      <div>
        <div>
          <label>Name: </label>
          <input id="name" type="text" name="name" placeholder="Name" />
        </div>
        <div>
          <label>Email: </label>
          <input id="email" type="text" name="email" placeholder="Email" />
        </div>
        <div>
          <label>Password: </label>
          <input type="password" />
        </div>
        <div>
          <input id="terms" type="checkbox" name="Terms" />
          <label>Terms and conditions</label>
        </div>

        <button type="submit">Submit</button>
      </div>
    </form>
  );
}
export default Form;
