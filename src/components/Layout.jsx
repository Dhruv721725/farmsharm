import Navbar from "./Navbar";

function Layout({ children }) {
  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="container mx-auto p-4">
        {children}
      </main>
    </div>
  );
}

export default Layout;