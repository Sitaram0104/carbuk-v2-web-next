import Image from "next/image";
import Link from "next/link";
import Button from "react-bootstrap/Button";

export default function NavBar({ handleLoginOpen }) {
  return (
    <div className="d-flex justify-content-center">
      <div
        className="d-flex flex-column justify-content-center align-items-center"
        style={{ zIndex: 1 }}
      >
        <Link href="/">
          <div
            className="mb-1 d-flex align-items-center justify-content-center shadow px-3 py-2 rounded"
            style={{ backdropFilter: "blur(14px)", cursor: "pointer" }}
          >
            <Image
              src="/carbuk_logo.png"
              layout="fixed"
              width={80}
              height={40}
              alt="logo"
              style={{ background: "black" }}
            />
            <h2 className="text-white user-select-none">Welcome to Carbuk</h2>
          </div>
        </Link>
        <div style={{ zIndex: 2 }}>
          <Link href="/">
            <Button variant="primary" className="mb-2 me-1">
              Home
            </Button>
          </Link>
          <Button
            variant="primary"
            className="mb-2 me-1"
            onClick={handleLoginOpen}
          >
            Login
          </Button>
          <Link href="/dashboard">
            <Button variant="primary" className="mb-2 me-1">
              Dashboard
            </Button>
          </Link>

          {/* <Button variant="primary" className="mb-2 me-1">
            Admin
          </Button>
          <Button variant="primary" className="mb-2 me-1">
            Moderator
          </Button>
          <Button variant="primary" className="mb-2 me-1">
            Driver
          </Button> */}
        </div>
      </div>
    </div>
  );
}
