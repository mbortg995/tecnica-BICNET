import { useAuth } from "@/context/AuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router";

export default function Dashboard() {
  const navigate = useNavigate();
  const { userToken } = useAuth();

  useEffect(() => {
    const getArticuloExt = async () => {
      try {
        const response = await fetch('http://localhost:51235/api/siglasauth/articulosext', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${userToken}`,
            'Accept': 'text/plain',
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          if (response.status === 401) {
            navigate("/login");
            return;
          }
          const errorText = await response.text();
          throw new Error(`Error ${response.status}: ${errorText}`);
        }

        const contentType = response.headers.get('Content-Type');
        const data = contentType && contentType.includes('application/json')
          ? await response.json()
          : await response.text();
        console.log(data);
        return data;
      } catch (error) {
        console.error('Error en la petición:', error.message);
      }
    };


    getArticuloExt();
  }
    , []);


  return (
    <p>Logueado</p>
  )
}