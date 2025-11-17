import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginWithGithub } from "../store/slices/authSlice";
import { ROUTES } from "../constants";

export const GithubCallbackPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const code = searchParams.get("code");
    const error = searchParams.get("error");

    if (error) {
      console.error("GitHub OAuth error:", error);
      navigate(ROUTES.LOGIN);
      return;
    }

    if (code) {
      dispatch(loginWithGithub(code))
        .unwrap()
        .then(() => {
          navigate(ROUTES.DASHBOARD);
        })
        .catch((err) => {
          console.error("GitHub login failed:", err);
          navigate(ROUTES.LOGIN);
        });
    } else {
      navigate(ROUTES.LOGIN);
    }
  }, [searchParams, navigate, dispatch]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-900 text-white">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500 mb-4"></div>
        <p className="text-lg">Completing GitHub authentication...</p>
      </div>
    </div>
  );
};

export default GithubCallbackPage;
