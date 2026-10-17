import Nav from "./Nav";
import Footer from "./Footer";
import ReadingRoom from "./ReadingRoom";

export default function InnerPage({ children, board = true }: { children: React.ReactNode; board?: boolean }) {
  return (
    <>
      <Nav />
      <main id="main">{children}</main>
      {board && <ReadingRoom />}
      <Footer />
    </>
  );
}
