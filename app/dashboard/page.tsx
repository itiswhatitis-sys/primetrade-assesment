"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const DashboardPage = () => {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        router.push("/login");
        return;
      }

      const res = await fetch("http://localhost:4000/api/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
      });

      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
      } else {
        router.push("/login");
      }
      setLoading(false);
    };

    fetchUser();
  }, [router]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      {user ? (
        <div>
          <p>Welcome, {user.name} ({user.email})</p>
          {/* You can add CRUD components here */}
        </div>
      ) : (
        <p>Not logged in</p>
      )}
    </div>
  );
};

export default DashboardPage;
