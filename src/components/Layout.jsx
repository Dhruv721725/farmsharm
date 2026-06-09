import Navbar from "./Navbar";

function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-[#f7faf7]">
      <Navbar />
      <main className="flex-1 z-11">
        {children}
      </main>
      <footer className="bg-green-900 text-green-300 text-center py-4 text-sm">
        FarmSharm — Connecting Farmers & Labourers across India
      </footer>
    </div>
  );
}

export default Layout;