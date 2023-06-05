import React from "react";
import Link from "next/link";

const TopNav = () => {
  return (
    <nav
      style={{
        backgroundColor: "#40ac64",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 20px",
        height: "60px",
        color: "white",
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <img
          src="/logo.png" // Replace with your logo image URL
          alt="Logo"
          style={{ width: "180px", marginRight: "10px" }}
        />
      </div>

      <div className="gap-4 hidden md:flex">
        <Link className="text-lg" href="/">
          Home
        </Link>
        <Link className="text-lg" href="/contact">
          Contact Us
        </Link>

        <Link href="/login" className="text-lg font-bold">
          Login
        </Link>
      </div>
    </nav>
  );
};

export default TopNav;
