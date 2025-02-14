"use client";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      //
        const res = await fetch(`${process.env.API}/register`, {
            method: "POST",
            headers: {
                "Content-type" : "application/json"
            },
            body: JSON.stringify({
                name, email, password
            })
        } )

        const data = await res.json();

        if(!res.ok){
            toast.error(data.err);
            setLoading(false);
        } else {
            toast.success(data.success);
            router.push("/login");
            setLoading(false);
        }
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  return (
    <main>
      <div className="container">
        <div className="row d-flex justify-content-center align-items-center vh-100 ">
          <div className="col-lg-4 shadow p-5 rounded-lg">
            <h2 className="mb-4 text-center">Register</h2>

            <form onSubmit={handleSubmit}>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="form-control mb-4"
                placeholder="Enter your name"
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-control mb-4"
                placeholder="Enter your email"
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-control mb-4"
                placeholder="Enter your Password"
              />
              <button 
                className="btn btn-primary btn-raised" type="submit" 
                disabled={loading || !name || !email || !password}>
                    { loading ? "Please wait" : "Submit" }
                </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
