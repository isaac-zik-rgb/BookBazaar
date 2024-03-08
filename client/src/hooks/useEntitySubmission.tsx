import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function useEntitySubmission(createEntity: any) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const submitEntity = async (data: any) => {
    setIsLoading(true);
    setError("");
    try {
      await createEntity(data);
      navigate("/app/dashboard");
    } catch (error: any) {
      if (error?.data?.detail) {
        setError(error.data.detail);
      } else {
        setError("Une erreur est survenue. Veuillez réessayer plus tard.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { submitEntity, isLoading, error };
}

export default useEntitySubmission;
