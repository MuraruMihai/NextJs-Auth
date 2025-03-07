"use client";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
        const result = await signIn("credentials", {
            redirect: false ,email, password
        })

        if(result?.error){
            toast.error(result?.error);
            setLoading(false);
        } else {
            toast.success("Logged in succesfully");
            router.push(callbackUrl);
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
            <h2 className="mb-4 text-center">Login</h2>

            <form onSubmit={handleSubmit}>
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
                disabled={loading || !email || !password}>
                    { loading ? "Please wait" : "Submit" }
                </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
